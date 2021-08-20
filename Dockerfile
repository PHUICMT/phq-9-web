FROM node:latest as builder

WORKDIR /app

COPY . .

RUN yarn install && yarn build
