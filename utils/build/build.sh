#!/bin/sh

cd "$(dirname "$0")"
node build.js --include common --output ../../build/three.orb.js
node build.js --include common --minify --output ../../build/three.orb.min.js
