#!/bin/bash
cd /home/z/my-project
while true; do
  npx next dev -p 3000 >> /home/z/my-project/dev.log 2>&1 &
  SERVER_PID=$!
  while kill -0 $SERVER_PID 2>/dev/null; do
    sleep 3
    curl -s -o /dev/null http://localhost:3000/ 2>/dev/null
  done
  echo "[$(date)] Restarting..." >> /home/z/my-project/dev.log
  sleep 2
done
