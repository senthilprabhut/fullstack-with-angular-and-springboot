# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:16.5.0 as build-step

# Set the working directory
RUN mkdir -p /app
WORKDIR /app

# Copy all files from current directory to working dir in image
COPY . .

# Install all the dependencies
RUN npm install

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
COPY --from=build-step /app/dist/todo /usr/share/nginx/html

# Expose 4200 as the host port and 80 as the container port.
EXPOSE 80

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]