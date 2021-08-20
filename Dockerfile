FROM node:alpine as build-stage

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY ./ ./

RUN npm install
RUN npm run build

EXPOSE 3000

FROM nginx:stable-alpine

WORKDIR /etc/nginx/logs
WORKDIR /usr/share/nginx/html

COPY --from=builder /app/build .
COPY --from=builder /app/etc/nginx.conf /etc/nginx/nginx.conf