# Step 1 — Build the Vite app
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2 — Serve with Nginx
FROM nginx:stable-alpine

# Copy Vite build output
COPY --from=builder /app/dist /usr/share/nginx/html

# Add custom Nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
