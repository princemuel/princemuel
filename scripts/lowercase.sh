#!/usr/bin/env bash

find . -depth -type f -exec bash -c 'mv "$0" "$(dirname "$0")/$(basename "$0" | tr "[:upper:]" "[:lower:]")"' {} \;
