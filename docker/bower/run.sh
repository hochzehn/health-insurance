#!/bin/bash

set -e

_term() {
  kill -TERM "$child" 2>/dev/null
}

trap _term SIGINT SIGTERM

function log() {
    echo ""
    date
    echo $1
}

cd /app

TOOL="Bower"

log "$TOOL: Copying node modules from global directory."
cp -R /npm/node_modules /app/

TOOL_PARAMS=$*
log "$TOOL: Running with parameters: $TOOL_PARAMS"

bower --allow-root $TOOL_PARAMS &

child=$!
wait "$child"

log  "$TOOL: Done."
