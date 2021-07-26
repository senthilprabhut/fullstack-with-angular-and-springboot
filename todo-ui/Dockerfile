# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:16.5.0 as build-step

# Set the working directory
RUN mkdir -p /angular-workdir
WORKDIR /angular-workdir

# # Install all the dependencies. If package.json hasn’t changed since the last build, 
# # we can use the cached output of the npm install layer
COPY package.json .
RUN npm install --force

# Copy all files from current directory to working dir in image
COPY . .

# Generate the build of the application
RUN npm run build

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the nginx configuration to the default one
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy static assets from build output to replace the default nginx contents.
COPY --from=build-step /angular-workdir/dist/todo /usr/share/nginx/html

# Substitue. Nginx start is written into run.sh helself
RUN echo "mainFileName=\"\$(ls /usr/share/nginx/html/main*.js)\" && \
          envsubst '\$BACKEND_API_URL ' < \${mainFileName} > main.tmp && \
          mv main.tmp  \${mainFileName} && nginx -g 'daemon off;'" > run.sh
RUN 

# Expose 4200 as the host port and 80 as the container port.
EXPOSE 80

# Containers run nginx with global directives and daemon off
#ENTRYPOINT ["nginx", "-g", "daemon off;"]
ENTRYPOINT ["sh", "run.sh"]