#!/bin/bash
callactivity=$(pm2 pid callactivityschedulereport);
if [ -z "$callactivity" ]; then
  pm2 start callactivityschedulereport.js;
else
  pm2 stop callactivityschedulereport;
  pm2 start callactivityschedulereport.js;
fi;
callsummerystatus=$(pm2 pid callsummery);
if [ -z "$callsummerystatus" ]; then
  pm2 start callsummery.js;
else
  pm2 stop callsummery;
  pm2 start callsummery.js;
fi;