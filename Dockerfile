# Use an official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (to leverage Docker cache)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Expose API port
EXPOSE 3000

# Start the app
CMD ["node", "src/index.js"]