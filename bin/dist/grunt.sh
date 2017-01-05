#!/usr/bin/env bash

set -e

PROJECT_NAME=$(basename $PWD)
TOOL_NAME="$PROJECT_NAME-grunt"

docker build -t "$TOOL_NAME" -f docker/grunt/Dockerfile .

docker run \
  --rm \
  -v "$PWD":/app \
  -w /app \
  "$TOOL_NAME" $*
