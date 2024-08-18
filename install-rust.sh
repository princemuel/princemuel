#!/bin/bash

touch lib/prisma.rs

# Install Rust using rustup (non-interactive, auto-confirm)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

# Source the Rust environment to make Cargo available
. "$HOME/.cargo/env"

# Confirm that Cargo is installed
cargo --version
