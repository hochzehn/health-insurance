#!/usr/bin/env bash

set -e

DIR=$1

docker run \
  --rm \
  -v ${DIR}:/workdir \
  debian:wheezy \
  chown -R $(id -u):$(id -g) /workdir
