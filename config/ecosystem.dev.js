module.exports = {
  apps: [{
    name: 'node-api-dev',
    script: 'ts-node',
    args: '--project config/tsconfig.node.json node-api/server.ts',
    cwd: process.cwd(),
    env: {
      EXAMPLE_VAR: 'dev-value',
    },
    instances: 1,
    autorestart: true,
    watch: ['node-api'],
    ignore_watch: ['node_modules', 'dist', '.git'],
    watch_delay: 1000,
    max_memory_restart: '1G'
  }]
};