FROM node:alpine as builder

WORKDIR /app

COPY . ./
RUN npm install
ENV PATH /app/node_modules/.bin:$PATH
RUN npm run build

FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY /nginx/nginx.conf /etc/nginx/conf.d

CMD [ "npm", "run", "start" ]