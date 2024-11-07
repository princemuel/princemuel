#!/bin/sh

if [[ $VERCEL == "1" ]]; then
  echo "Unshallowing repository for Vercel..."
  git pull --unshallow https://github.com/princemuel/princemuel.com.git "${PUBLIC_VERCEL_GIT_COMMIT_SHA}:master" >/dev/null 2>&1
fi
