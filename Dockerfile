FROM node:alpine
RUN apk add --no-cache python3 py3-pip make g++
WORKDIR /app

COPY . ./
RUN yarn
ENV PATH /app/node_modules/.bin:$PATH
RUN yarn build

CMD [ "yarn", "start" ]