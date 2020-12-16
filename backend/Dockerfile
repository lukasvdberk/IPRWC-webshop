FROM node:latest

WORKDIR /app
COPY ./ /app

RUN npm -g config set user root
RUN npm i --silent

ENTRYPOINT /app/entrypoint.sh
