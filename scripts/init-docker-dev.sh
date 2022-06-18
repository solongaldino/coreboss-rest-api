#!/bin/bash

if [ -d node_modules ];
then 
    echo "node dependencies installed"
else
    echo "The Directory is not present"
    npm ci
    npx prisma generate
fi