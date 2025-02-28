#!/bin/bash

# Cleanup script to run after the PR is merged

# Switch to dev branch and pull latest changes
git checkout dev
git pull origin dev

# Delete the feature branch locally once it's merged
git branch -d feature/footer

# Remove temporary files created during development
rm -f commit_message.txt upwork_commit.txt youtube_commit.txt final_commit.txt

echo "Cleanup completed. Feature branch deleted and temporary files removed." 