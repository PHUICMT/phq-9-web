FROM node:alpine as build-stage

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY ./ ./

RUN npm install
RUN npm run build

EXPOSE 3000
FROM nginx:alpine
COPY --from=build-stage ./app/build/ /usr/share/nginx/html
COPY --from=build-stage ./nginx.conf /etc/nginx/conf.d/default.conf