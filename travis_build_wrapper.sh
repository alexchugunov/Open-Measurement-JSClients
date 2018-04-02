#!/bin/bash

# Fail on any error.
set -e

# Travis-CI builds only run tests
export BUILD_VERSION="dev"
./build.sh
