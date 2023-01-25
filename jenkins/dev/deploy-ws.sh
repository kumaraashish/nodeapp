#!/bin/bash
pid=$(pm2 pid ws-hs-notify-dev-api)
echo $pid
if [ -z "$pid" ]; then
  echo "process not running start it";
  pm2 start index.js --name ws-hs-notify-dev-api;
else
  echo "process already running stop and start again";
  pm2 stop ws-hs-notify-dev-api;
  pm2 start index.js --name ws-hs-notify-dev-api;
fi;