#!/bin/bash

# Path to the folder containing the .png files
folder="./App/src/assets/dauntless/builds"

# Output JSON file name
json_file="./App/src/assets/dauntless/icons.json"

# Create the header of the JSON file
echo "[" > $json_file

# Iterate over the .png files in the folder
for png_file in "$folder"/*.png; do
    # Get only the file name (without the path)
    file_name=$(basename "$png_file")

    # Add the file name to the JSON file
    echo "  \"$file_name\"," >> $json_file
done

# Use find to get all .png files in the folder and its subfolders
# find "$folder" -type f -name "*.png" | while read -r png_file; do
#     # Get only the file name (without the path)
#     file_name=$(basename "$png_file")
# 
#     # Add the file name to the JSON file
#     echo "  \"$file_name\"," >> "$json_file"
# done

# Remove the last comma from the JSON file
sed -i '$ s/,$//' $json_file

# Close the JSON file
echo "]" >> $json_file

echo "Generated JSON file: $json_file"
