#!/bin/bash

read -p "Enter the directory path (or press Enter for the current directory): " target_directory
target_directory="${target_directory:-.}"

echo "This script will rename files with a specified extension in the target directory and its subdirectories."

read -p "Enter the current extension (e.g., md): " current_extension
read -p "Enter the new extension (e.g., mdx): " new_extension

echo "Renaming files with .$current_extension extension to .$new_extension extension in $target_directory and its subdirectories."

read -p "Do you want to proceed? (y/n): " choice

if [ "$choice" != "y" ]; then
  echo "Exiting without renaming files."
  exit 0
fi

find "$target_directory" -type f -name "*.$current_extension" -exec bash -c '
  current_file="$0"
  echo "Renaming file: $current_file"
  read -p "Proceed with renaming? (y/n): " rename_choice
  if [ "$rename_choice" == "y" ]; then
    new_file="${current_file%.$1}.$2"
    mv "$current_file" "$new_file"
    echo "File renamed to: $new_file"
  else
    echo "File not renamed."
  fi
' {} "$current_extension" "$new_extension" \;
