#!/bin/bash

# Fail on any error.
set -e
# Display commands being run.
set -x

# Show node version
node -v

#Show npm version
npm -v

# Install dependencies
npm install

# List actual package versions installed
npm list

# Run linter checks
npm run lint

# Run unit and full-stack tests
npm run test

# Run the build to produce final deliverables
npm run build
