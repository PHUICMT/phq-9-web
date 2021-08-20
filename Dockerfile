FROM node:alpine as builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY ./ ./

RUN npm install
ENV PATH /app/node_modules/.bin:$PATH
RUN npm run build

EXPOSE 3000

FROM nginx:stable-alpine

WORKDIR /etc/nginx/logs
WORKDIR /usr/share/nginx/html

COPY --from=builder /app/build .
COPY --from=builder /app/etc/nginx.conf /etc/nginx/nginx.conf