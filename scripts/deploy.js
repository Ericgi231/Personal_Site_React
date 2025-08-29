require('dotenv').config();

const Client = require('ssh2-sftp-client');
const { Client: SSHClient } = require('ssh2');
const path = require('path');
const fs = require('fs');

const sftp = new Client();

const config = {
  host: process.env.DEPLOY_HOST,
  username: process.env.DEPLOY_USER,
  privateKey: fs.readFileSync(process.env.DEPLOY_KEY_PATH)
};

async function uploadDir(localDir, remoteDir, exclude = []) {
  const files = fs.readdirSync(localDir);
  for (const file of files) {
    if (exclude.includes(file)) continue;
    const localPath = path.join(localDir, file);
    const remotePath = path.posix.join(remoteDir, file);
    if (fs.statSync(localPath).isDirectory()) {
      try { await sftp.mkdir(remotePath, true); } catch {}
      await uploadDir(localPath, remotePath, exclude);
    } else {
      await sftp.put(localPath, remotePath);
      console.log(`Uploaded: ${localPath} -> ${remotePath}`);
    }
  }
}

async function clearRemoteDir(remoteDir) {
  try {
    const list = await sftp.list(remoteDir);
    for (const item of list) {
      const remotePath = path.posix.join(remoteDir, item.name);
      if (item.type === 'd') {
        await clearRemoteDir(remotePath);
        await sftp.rmdir(remotePath, true);
      } else {
        await sftp.delete(remotePath);
      }
    }
    console.log(`Cleared remote directory: ${remoteDir}`);
  } catch (err) {
    // If the directory doesn't exist, ignore the error
    if (err.code !== 2) {
      throw err;
    }
  }
}

function runRemoteCommand(command, cwd = null) {
  return new Promise((resolve, reject) => {
    const ssh = new SSHClient();
    ssh
      .on('ready', () => {
        ssh.exec(cwd ? `cd ${cwd} && ${command}` : command, (err, stream) => {
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
                reject(new Error(`Remote command failed with code ${code}`));
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
    await sftp.connect(config);

    // Upload apis
    await uploadDir('dist/node-api', '/var/www/node-api');
    await uploadDir('dist/php-api', '/var/www/php-api');

    // Delete old assets
    await clearRemoteDir('/var/www/html/assets');

    // Upload dist (excluding apis) to /var/www/html
    const distFiles = fs.readdirSync('dist').filter(f => f !== 'node-api' && f !== 'php-api');
    for (const file of distFiles) {
      const localPath = path.join('dist', file);
      const remotePath = path.posix.join('/var/www/html', file);
      if (fs.statSync(localPath).isDirectory()) {
        try { await sftp.mkdir(remotePath, true); } catch {}
        await uploadDir(localPath, remotePath);
      } else {
        await sftp.put(localPath, remotePath);
        console.log(`Uploaded: ${localPath} -> ${remotePath}`);
      }
    }

    await sftp.end();

    // Run npm install in /var/www/node-api on the server
    console.log('Running npm install in /var/www/node-api...');
    await runRemoteCommand('npm install', '/var/www/node-api');

    console.log('Deploy complete!\n\nNOTE: If any new files were created you will need to ssh into the server and run:\nchown -R www-data:www-users /var/www/node /var/www/html\nchmod -R 775 /var/www/node /var/www/html');
  } catch (err) {
    console.error('Deploy failed:', err);
    process.exit(1);
  }
}

main();