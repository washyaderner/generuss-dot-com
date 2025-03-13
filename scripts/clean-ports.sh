#!/bin/bash

# clean-ports.sh
# This script checks for and terminates processes running on ports 3000 and 3001
# which are commonly used by Next.js development servers.

echo "Checking for processes on ports 3000 and 3001..."

# Function to kill process on a port
kill_port_process() {
  PORT=$1
  # Get process ID using the port
  PID=$(lsof -t -i:$PORT)
  
  if [ -n "$PID" ]; then
    echo "Found process $PID using port $PORT. Terminating..."
    kill -9 $PID
    echo "Process on port $PORT terminated."
  else
    echo "No process found on port $PORT."
  fi
}

# Kill processes on ports 3000 and 3001
kill_port_process 3000
kill_port_process 3001

echo "Port cleanup complete."
echo "You can now run 'npm run dev' without port conflicts." 