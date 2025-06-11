npm run build
npm run start
# Check if the build was successful
if [ $? -eq 0 ]; then
  echo "Build and start successful."
else
  echo "Build or start failed."
  exit 1
fi