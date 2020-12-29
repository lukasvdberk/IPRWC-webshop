#!/bin/bash
npm install --silent
chmod -R 777 /media
chmod -R 777 /app

if $PRODUCTION ; then
    echo 'Running production'
    node app.js
else
   echo 'Running development'
   npm start app.js
fi
