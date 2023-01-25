#!/bin/bash
pid=$(pm2 pid hs-notify-dev-api);
if [ -z "$pid" ]; then
  pm2 start index.js --name hs-notify-dev-api;
else
  pm2 stop hs-notify-dev-api;
  pm2 start index.js --name hs-notify-dev-api;
fi;