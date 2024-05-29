#!/usr/bin/env bash

# Enable readline for path auto-completion
if [ -f /etc/bash_completion ]; then
    . /etc/bash_completion
fi

# Function to prompt user for target directory
prompt_target_directory() {
  read -e -p "Enter the target directory to copy .md and .mdx files: " target_directory
  # Check if the specified directory exists
  if [ ! -d "$target_directory" ]; then
    echo "Error: Directory $target_directory not found."
    prompt_target_directory
  fi
}

# Function to count the number of files in a directory, excluding README files
count_files() {
  local directory="$1"
  local count=$(find "$directory" -type f -name '*.md' -o -name '*.mdx' ! -name 'README*' | wc -l)
  echo "$count"
}

# Prompt user to enter the directory containing repositories
read -e -p "Enter the directory containing your repositories: " repos_directory

# Check if the specified directory exists
if [ ! -d "$repos_directory" ]; then
  echo "Error: Directory $repos_directory not found."
  exit 1
fi

# Function to copy files with .mdx and .md extension, excluding README files
copy_files() {
  local source_directory="$1"
  local target_directory="$2"

  # Create target directory if it doesn't exist
  mkdir -p "$target_directory"

  # Copy files with .mdx and .md extension, excluding README files, to the target directory
  find "$source_directory" -type f \( -name "*.mdx" -o -name "*.md" \) ! -name 'README*' -exec cp {} "$target_directory" \;
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

# Get initial count of files in target directory
initial_file_count=$(count_files "$target_directory")

# Copy .mdx and .md files from all repositories to the target directory
echo "Copying .mdx and .md files to $target_directory"
copy_files "$repos_directory" "$target_directory"

# Get the number of files copied
copied_file_count=$(($(count_files "$target_directory") - initial_file_count))

# Get the final count of files in target directory
final_file_count=$(count_files "$target_directory")

# Output the number of files copied and the number of files now in the target directory
echo "Initial number of files: $copied_file_count"
echo "Number of files copied: $copied_file_count"
echo "Number of files now in the target directory: $final_file_count"
