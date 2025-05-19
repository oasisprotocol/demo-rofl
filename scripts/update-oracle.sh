#!/bin/zsh
# update-oracle.sh
# Updates the oracle folder from the Oasis SDK repository.
# Downloads the latest oracle implementation example from the Oasis SDK
# repository and makes it available in the /oracle directory.

set -e

# Remove existing /oracle directory if it exists
rm -rf oracle

# Remove any previous /oasis-sdk temp directory
rm -rf oasis-sdk

# Clone oasis-sdk repo with sparse-checkout enabled
GIT_REPO="https://github.com/oasisprotocol/oasis-sdk.git"
SPARSE_PATH="examples/runtime-sdk/rofl-oracle/oracle"

git clone --filter=blob:none --sparse "$GIT_REPO" oasis-sdk
cd oasis-sdk
git sparse-checkout set "$SPARSE_PATH"
cd ..

# Copy the oracle directory from the temp oasis-sdk to /oracle
cp -R oasis-sdk/$SPARSE_PATH oracle

# Remove the temp oasis-sdk directory
rm -rf oasis-sdk

echo "Oracle directory updated from the Oasis SDK repository."
echo "You can now add these files to your git repository if desired."
