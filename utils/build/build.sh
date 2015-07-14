#!/bin/sh

cd "$(dirname "$0")"
python build.py --include common --output ../../build/three.orb.js
python build.py --include common --minify --output ../../build/three.orb.min.js
