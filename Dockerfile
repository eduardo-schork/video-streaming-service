FROM node:16.14.2-alpine

RUN apk update
RUN apk add ffmpeg

WORKDIR /app

COPY . .

RUN yarn install

