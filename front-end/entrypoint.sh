#!/bin/bash

if $PRODUCTION ; then
    echo 'Running production'
    rm -rf node_modules
    npm install
    ng build --prod
else
   echo 'Running development'

   ng serve --host 0.0.0.0
fi
