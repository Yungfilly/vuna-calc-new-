# ================================================
# VUNA Calculator — Multi-Stage Dockerfile
# Babatunde Philip Olutayo
# Stage 1: Lint + Test (Node 22 Alpine)
# Stage 2: Serve static files (nginx Alpine)
# ================================================


# ── STAGE 1: CI — Lint and Test ──────────────────
FROM node:22-alpine AS ci

# Set working directory
WORKDIR /app

# Copy dependency files first (layer caching)
COPY package.json package-lock.json ./

# Install dev dependencies (Jest, ESLint)
RUN npm ci

# Copy source code
COPY . .

# Run ESLint — fails build if there are errors (warnings are ok)
RUN npm run lint

# Run Jest unit tests — fails build if any test fails
RUN npm test


# ── STAGE 2: SERVE — nginx static server ─────────
FROM nginx:alpine AS serve

# Remove default nginx placeholder page
RUN rm -rf /usr/share/nginx/html/*

# Copy only the files the browser needs
COPY index.html          /usr/share/nginx/html/
COPY assets/             /usr/share/nginx/html/assets/

# Expose port 80
EXPOSE 80

# nginx starts automatically — no CMD needed