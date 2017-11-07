#!/bin/sh
set -eux

curl http://localhost:3500/slow?[1-2000]
