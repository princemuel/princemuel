#!/usr/bin/env bash

# Input validation function
validate_input() {
  if [[ -z "$1" ]]; then
    echo "Error: Input cannot be empty."
    exit 1
  fi
}

# Function to check if a file already exists
file_exists() {
  if [[ -e "$1" ]]; then
    echo "Error: File '$1' already exists."
    exit 1
  fi
}

# Prompt for directory path, default to current directory
read -r -p "Enter the directory path (or press Enter for the current directory): " target_directory
target_directory="${target_directory:-.}"
validate_input "$target_directory"

# Prompt for current and new extensions
read -r -p "Enter the current extension (e.g., md): " current_extension
validate_input "$current_extension"
read -r -p "Enter the new extension (e.g., mdx): " new_extension
validate_input "$new_extension"

# Check if new extension already exists in target directory
file_exists "$target_directory/*.$new_extension"

echo "This script will rename files with a specified extension in the target directory and its subdirectories."

# Prompt for renaming mode
read -r -p "Choose renaming mode: (a) All files at once, (o) One by one (a/o): " renaming_mode
if [[ "$renaming_mode" != "a" && "$renaming_mode" != "o" ]]; then
  echo "Error: Invalid renaming mode. Please choose 'a' or 'o'."
  exit 1
fi

echo "Renaming files with .$current_extension extension to .$new_extension extension in $target_directory and its subdirectories."

# Function to rename files
rename_files() {
  local current_file="$1"
  local new_file="${current_file%."$2"}.$3"
  mv "$current_file" "$new_file"
  echo "File renamed to: $new_file"
}

# Rename files one by one
if [[ "$renaming_mode" == "o" ]]; then
  echo "You chose to rename files one by one."
  find "$target_directory" -type f -name "*.$current_extension" | while read -r current_file; do
    echo "Renaming file: $current_file"
    read -r -p "Proceed with renaming? (y/n): " rename_choice
    if [[ "$rename_choice" == "y" ]]; then
      rename_files "$current_file" "$current_extension" "$new_extension"
    else
      echo "File not renamed."
    fi
  done
# Rename all files at once
else
  echo "You chose to rename all files at once."
  find "$target_directory" -type f -name "*.$current_extension" | while read -r current_file; do
    rename_files "$current_file" "$current_extension" "$new_extension"
  done
fi
