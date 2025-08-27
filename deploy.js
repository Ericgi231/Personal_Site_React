const Client = require('ssh2-sftp-client');
const path = require('path');
const fs = require('fs');

const sftp = new Client();

const config = {
  host: 'ericgi231.me',
  username: 'ericgi231',
  privateKey: fs.readFileSync('C:/Users/ericg/.ssh/id_ed25519')
};

// Helper to upload a local directory recursively
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

async function main() {
  try {
    await sftp.connect(config);

    // Upload dist/node to /var/www/
    await uploadDir('dist/node', '/var/www/node');

    // Upload dist (excluding node) to /var/www/html
    const distFiles = fs.readdirSync('dist').filter(f => f !== 'node');
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
    console.log('Deploy complete!\n\nNOTE: If any new files were created you will need to ssh into the server and run:\nchown -R www-data:www-users /var/www/node /var/www/html\nchmod -R 775 /var/www/node /var/www/html');
  } catch (err) {
    console.error('Deploy failed:', err);
    process.exit(1);
  }
}

main();