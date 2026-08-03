#!/bin/bash
# Why: remove the PATH symlink that after-install.sh created, but only if it
# still points into an CaPilot install dir — never delete an unrelated
# /usr/bin/capilot-ide a user or other package may own.
set -e

link="/usr/bin/capilot-ide"

if [ -L "$link" ]; then
  target="$(readlink "$link" || true)"
  case "$target" in
    /opt/CaPilot/*|/opt/capilot-ide/*|/opt/capilot/*)
      rm -f "$link"
      ;;
  esac
fi

exit 0
