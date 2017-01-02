#!/usr/bin/env bash

docker build -t bower -f docker/bower/Dockerfile .

docker run \
  --rm \
  -v "$PWD":/app \
  -w /app \
  bower $*

bin/own.sh ${PWD}/bower.json
bin/own.sh ${PWD}/bower_components/
