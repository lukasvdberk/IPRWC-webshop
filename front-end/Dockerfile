FROM node:10

WORKDIR /app
COPY . /app
COPY package*.json ./

RUN chown -Rh $user:$user /app
USER $user

RUN npm install
RUN npm install --save-dev @angular-devkit/build-angular
RUN npm install -g @angular/cli


ENTRYPOINT /app/entrypoint.sh
