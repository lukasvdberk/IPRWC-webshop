FROM node:latest

WORKDIR /app
COPY ./ /app

RUN npm i --silent

ENTRYPOINT /app/entrypoint.sh
