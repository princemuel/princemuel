#!/bin/bash

# Function to prompt user for target directory
prompt_target_directory() {
  read -r -p "Enter the target directory to copy .mdx files: " target_directory
  # Check if the specified directory exists
  if [ ! -d "$target_directory" ]; then
    echo "Error: Directory $target_directory not found."
    prompt_target_directory
  fi
}

# Prompt user to enter the directory containing repositories
read -r -p "Enter the directory containing your repositories: " repos_directory

# Check if the specified directory exists
if [ ! -d "$repos_directory" ]; then
  echo "Error: Directory $repos_directory not found."
  exit 1
fi

# Function to copy files with .mdx extension
copy_files() {
  local source_directory="$1"
  local target_directory="$2"
  local extension="mdx"

  # Create target directory if it doesn't exist
  mkdir -p "$target_directory"

  # Copy files with .mdx extension to the target directory
  find "$source_directory" -type f -name "*.$extension" -exec cp {} "$target_directory" \;
}

# Iterate over each directory in the specified directory
for repo in "$repos_directory"/*/; do
  # Check if the current directory is a Git repository
  if [ -d "$repo/.git" ]; then
    echo "Pulling changes in $(basename "$repo")"
    # Change directory to the repository and run git pull --all
    (cd "$repo" && git pull --all)
  else
    echo "Skipping $(basename "$repo"): Not a Git repository"
  fi
done

# Prompt user to enter the target directory
prompt_target_directory

# Copy .mdx files from all repositories to the target directory
echo "Copying .mdx files to $target_directory"
copy_files "$repos_directory" "$target_directory"
