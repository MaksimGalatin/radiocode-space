const { spawn } = require('child_process');
const fs = require('fs');

const logFd = fs.openSync('/home/z/my-project/dev.log', 'a');

const server = spawn('npx', ['next', 'dev', '-p', '3000'], {
  cwd: '/home/z/my-project',
  stdio: ['ignore', logFd, logFd],
  detached: true
});

server.unref();
console.log('Server PID:', server.pid);
