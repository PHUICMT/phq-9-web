FROM node:10-alpine as builder

# install and cache app dependencies
COPY package.json package-lock.json ./
RUN npm install --only=prod&& mkdir /phq-9-web && mv ./node_modules ./phq-9-web

WORKDIR /phq-9-web

COPY . .

RUN npm run build