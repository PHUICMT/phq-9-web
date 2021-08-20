FROM node as builder

WORKDIR /app

COPY . ./
RUN npm install
ENV PATH /app/node_modules/.bin:$PATH
RUN npm run build

FROM nginx:alpine

WORKDIR /etc/nginx/logs
WORKDIR /usr/share/nginx/html

COPY --from=builder /app/build .
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf