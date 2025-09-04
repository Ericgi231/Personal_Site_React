module.exports = {
  apps: [{
    name: 'node-api',
    script: './server.js',
    cwd: '/var/www/node-api',
    env: {
        EXAMPLE_VAR: 'value',
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
};