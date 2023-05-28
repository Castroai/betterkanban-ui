# Stage 1: Build the app
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the app's source code
COPY . .

# Build the app
RUN npm run build


# Stage 2: Serve the app
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the built app from the previous stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/public ./public

# Install serve globally
RUN npm install -g serve

# Expose the desired port (replace 3000 with your app's port if needed)
EXPOSE 3000

# Set the command to serve the app
CMD ["serve", "-s", "dist", "-l", "3000"]
