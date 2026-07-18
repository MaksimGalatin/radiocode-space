import { spawn } from 'child_process';

const server = spawn('npx', ['next', 'dev', '-p', '3000'], {
  cwd: '/home/z/my-project',
  stdio: ['ignore', 'open', 'open'].map(s => 
    s === 'open' ? require('fs').openSync('/home/z/my-project/dev.log', 'a') : s
  ),
  detached: true
});

server.unref();
console.log('Server PID:', server.pid);
