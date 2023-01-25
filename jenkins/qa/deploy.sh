#!/bin/bash
pid=$(pm2 pid hs-notify-qa-api);
if [ -z "$pid" ]; then
  pm2 start index.js --name hs-notify-qa-api;
else
  pm2 stop hs-notify-qa-api;
  pm2 start index.js --name hs-notify-qa-api;
fi