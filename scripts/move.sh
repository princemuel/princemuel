#!/bin/bash

# Function to move .mdx files to a subdirectory
move_mdx_files() {
  local source_directory="$1"
  local subdirectory_name="$2"

  # Create subdirectory if it doesn't exist
  mkdir -p "$source_directory/$subdirectory_name"

  # Move .mdx files to the subdirectory
  find "$source_directory" -maxdepth 1 -type f -name "*.mdx" -exec mv -t "$source_directory/$subdirectory_name" {} +
}

# Prompt user to enter the directory containing .mdx files
read -r -p "Enter the directory containing .mdx files: " source_directory

# Check if the specified directory exists
if [ ! -d "$source_directory" ]; then
  echo "Error: Directory $source_directory not found."
  exit 1
fi

# Prompt user to enter the name of the subdirectory
read -r -p "Enter the name of the subdirectory to move .mdx files into: " subdirectory_name

# Move .mdx files to the subdirectory
move_mdx_files "$source_directory" "$subdirectory_name"

echo ".mdx files moved to $source_directory/$subdirectory_name"
