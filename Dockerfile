FROM node:14.16.0-alpine AS builder

WORKDIR /app

COPY . ./
RUN npm install
ENV PATH /app/node_modules/.bin:$PATH
RUN npm run build

FROM nginx:stable-alpine

WORKDIR /etc/nginx/logs
WORKDIR /usr/share/nginx/html

COPY --from=builder /app/build .
COPY --from=builder /app/etc/nginx.conf /etc/nginx/nginx.conf