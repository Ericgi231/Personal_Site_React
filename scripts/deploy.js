import 'dotenv/config';
import Client from 'ssh2-sftp-client';
import { Client as SSHClient } from 'ssh2';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sftp = new Client();

const config = {
  host: process.env.DEPLOY_HOST,
  username: process.env.DEPLOY_USER,
  privateKey: fs.readFileSync(process.env.DEPLOY_KEY_PATH)
};

const PROTECTED_DIRECTORIES = [
  '/var/www/html',
  '/var/www/html/collection',
  '/var/www', 
  '/',
  '/home',
  '/etc'
];

async function uploadDir(localDir, remoteDir, exclude = []) {
  const files = fs.readdirSync(localDir);
  for (const file of files) {
    if (exclude.includes(file)) continue;
    const localPath = path.join(localDir, file);
    const remotePath = path.posix.join(remoteDir, file);
    if (fs.statSync(localPath).isDirectory()) {
      await ensureRemoteDir(remotePath);
      await uploadDir(localPath, remotePath, exclude);
    } else {
      try {
        await sftp.put(localPath, remotePath);
        console.log(`Uploaded: ${localPath} -> ${remotePath}`);
      } catch (err) {
        console.error(`Failed to upload ${localPath}:`, err.message);
        throw err;
      }
    }
  }
}

async function ensureRemoteDir(remotePath) {
  const parts = remotePath.split('/').filter(Boolean);
  let currentPath = '';
  
  for (const part of parts) {
    currentPath += '/' + part;
    try {
      await sftp.mkdir(currentPath);
    } catch (err) {
      console.log(`Directory exists or error: ${currentPath}`);
    }
  }
}

async function clearRemoteDir(remoteDir, exclude = []) {
  // Safety check - never delete protected directories
  const normalizedPath = path.posix.normalize(remoteDir);
  if (PROTECTED_DIRECTORIES.includes(normalizedPath)) {
    console.log(`SAFETY: Refusing to clear protected directory: ${remoteDir}`);
    return;
  }

  try {
    const list = await sftp.list(remoteDir);
    for (const item of list) {
      // Skip excluded directories/files
      if (exclude.includes(item.name)) {
        console.log(`Skipping excluded item: ${item.name}`);
        continue;
      }

      const remotePath = path.posix.join(remoteDir, item.name);
      if (item.type === 'd') {
        await clearRemoteDir(remotePath, exclude);
        await sftp.rmdir(remotePath, true);
      } else {
        await sftp.delete(remotePath);
      }
    }
    console.log(`Cleared remote directory: ${remoteDir} (excluding: ${exclude.join(', ')})`);
  } catch (err) {
    if (err.code !== 2) {
      console.error(`Failed to clear ${remoteDir}:`, err.message);
      throw err;
    }
    console.log(`Directory ${remoteDir} doesn't exist, skipping cleanup`);
  }
}

function runRemoteCommand(command, cwd = null) {
  return new Promise((resolve, reject) => {
    const ssh = new SSHClient();
    ssh
      .on('ready', () => {
        const fullCommand = cwd ? `cd ${cwd} && ${command}` : command;
        ssh.exec(fullCommand, (err, stream) => {
          if (err) {
            ssh.end();
            return reject(err);
          }
          stream
            .on('close', (code, signal) => {
              ssh.end();
              if (code === 0) {
                resolve();
              } else {
                reject(new Error(`Remote command failed with code ${code}: ${fullCommand}`));
              }
            })
            .on('data', data => process.stdout.write(data))
            .stderr.on('data', data => process.stderr.write(data));
        });
      })
      .connect(config);
  });
}

async function main() {
  try {
    console.log('Starting deployment...');
    await sftp.connect(config);

    // Clean target directories before upload (preserve node_modules)
    console.log('Cleaning remote directories...');
    await clearRemoteDir('/var/www/node-api', ['node_modules']);
    await clearRemoteDir('/var/www/php-api'); 
    await clearRemoteDir('/var/www/html/assets');

    console.log('Uploading Node.js API...');
    await uploadDir('dist/node-api', '/var/www/node-api');
    
    console.log('Uploading PHP API...');
    await uploadDir('dist/php-api', '/var/www/php-api');

    console.log('Uploading frontend...');
    await uploadDir('dist/html', '/var/www/html');

    await sftp.end();

    // Install dependencies and restart services
    console.log('Installing Node.js dependencies...');
    await runRemoteCommand('npm install --omit=dev', '/var/www/node-api');

    console.log('Restarting Node.js API...');
    await runRemoteCommand('pm2 restart ecosystem.config.js', '/var/www/node-api');

    console.log('Deploy complete!');
    console.log('\nNOTE: If any new files were created you may need to run:');
    console.log('   chown -R www-data:www-users /var/www/node-api /var/www/php-api /var/www/html');
    console.log('   chmod -R 775 /var/www/node-api /var/www/php-api /var/www/html');
  } catch (err) {
    console.error('Deploy failed:', err.message);
    process.exit(1);
  }
}

main();