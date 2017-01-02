#!/usr/bin/env bash

set -e

TERMINAL_ARGS=""

if [ -t 1 ] ; then
  TERMINAL_ARGS="-it"
fi

docker run \
  $TERMINAL_ARGS \
  --rm \
  -v $PWD:/opt/karma \
  hochzehn/karma-jasmine-phantomjs start $*
