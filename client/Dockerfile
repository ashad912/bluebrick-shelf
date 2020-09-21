# Specify a base image with npm preinstalled
FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Install some deps
RUN npm install --silent

# Copy app source code
COPY . .

# Expose port and start application
EXPOSE 3000
CMD ["npm", "start"]