FROM node:18-alpine

WORKDIR /var/www/api

COPY package*.json /var/www/api

RUN npm install

COPY . /var/www/api

EXPOSE 3000

CMD [ "npm", "start" ]