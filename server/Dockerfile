# Specify a base image with npm preinstalled
FROM node:alpine    

# Changing project workspace
WORKDIR /usr/src/app

# First copy package.json, if changed, install deps (still not ideal :<)
COPY ./package.json ./

# Install some deps
RUN npm install

# Copy project from the 'machine' to container
COPY ./ ./

# Document which ports are intended to published 
EXPOSE 4000

# Default command
CMD ["npm", "start"]