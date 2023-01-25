#!/bin/bash

schedulereportstatus=$(pm2 pid schedulereport);
if [ -z "$schedulereportstatus" ]; then
  pm2 start schedulereport.js;
else
  pm2 stop schedulereport;
  pm2 start schedulereport.js;
fi;
emrtdatastatus=$(pm2 pid emrtdata);
if [ -z "$emrtdatastatus" ]; then
  pm2 start emrtdata.js;
else
  pm2 stop emrtdata;
  pm2 start emrtdata.js;
fi;