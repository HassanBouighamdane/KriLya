# Stage 1: Build
FROM node:20.10.0-alpine AS build
WORKDIR /app
COPY ./frontend .
RUN npm install
RUN npm run build


# Update curl to the latest version available in Alpine
RUN apk --no-cache upgrade && \
    apk --no-cache add curl

