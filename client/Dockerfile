# build environment
FROM node:12.4.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install 
RUN npm install react-scripts@3.0.1 -g 
COPY . /app
RUN npm run build

# production environment
FROM nginx:1.16.0-alpine
# Nginx configuration
# COPY nginx.conf /etc/nginx/nginx.conf
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html

# Set permissions so nginx can serve it
RUN chown nginx.nginx /usr/share/nginx/html/ -R

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]