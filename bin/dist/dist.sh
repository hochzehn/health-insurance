#!/usr/bin/env bash

set -e

bin/dist/grunt.sh dist

bin/own.sh "$PWD"/dist
