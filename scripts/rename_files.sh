#!/usr/bin/env bash

read -r -p "Enter the directory path (or press Enter for the current directory): " target_directory
target_directory="${target_directory:-.}"

echo "This script will rename files with a specified extension in the target directory and its subdirectories."

read -r -p "Enter the current extension (e.g., md): " current_extension
read -r -p "Enter the new extension (e.g., mdx): " new_extension

echo "Renaming files with .$current_extension extension to .$new_extension extension in $target_directory and its subdirectories."

read -r -p "Choose renaming mode: (a) All files at once, (o) One by one (a/o): " renaming_mode

if [ "$renaming_mode" == "o" ]; then
  echo "You chose to rename files one by one."
  find "$target_directory" -type f -name "*.$current_extension" -exec bash -c '
    current_file="$0"
    echo "Renaming file: $current_file"
    read -r -p "Proceed with renaming? (y/n): " rename_choice
    if [ "$rename_choice" == "y" ]; then
      new_file="${current_file%.$1}.$2"
      mv "$current_file" "$new_file"
      echo "File renamed to: $new_file"
    else
      echo "File not renamed."
    fi
  ' {} "$current_extension" "$new_extension" \;
else
  echo "You chose to rename all files at once."
  find "$target_directory" -type f -name "*.$current_extension" -exec bash -c '
    current_file="$0"
    new_file="${current_file%.$1}.$2"
    mv "$current_file" "$new_file"
    echo "File renamed: $new_file"
  ' {} "$current_extension" "$new_extension" \;
fi
