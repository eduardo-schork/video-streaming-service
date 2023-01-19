FROM node:16.14.2-alpine

RUN apk update
RUN apk add ffmpeg

WORKDIR /app

COPY yarn*.lock .

RUN yarn install

COPY . .


