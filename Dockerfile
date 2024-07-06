# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
# This allows Docker to cache dependencies installation
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Install backend dependencies
RUN cd backend && npm install

# Install frontend dependencies
RUN cd frontend && npm install

# Copy the backend and frontend code to the working directory
COPY backend ./backend
COPY frontend ./frontend

# Expose the port where the backend server will run
EXPOSE 5000

# Set the default command to run your backend server
CMD ["node", "backend/server.js"]
