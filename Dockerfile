FROM node:latest as builder

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "run", "start"]