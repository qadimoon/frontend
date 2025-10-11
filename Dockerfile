# Use the official Node.js image as the base image
FROM node:22-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Angular application
RUN npm run build

# Use NGINX as the runtime image
FROM nginx:stable

# Copy the custom NGINX configuration file to the container in the default location
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the built Angular application to the NGINX web server directory
COPY --from=build /app/dist/qadimoon-frontend/browser /usr/share/nginx/html

# Expose the application port
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"] 