FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN apt-get update && apt-get install vim nano -y && apt-get install nmap -y

RUN npm install

COPY . .

CMD [ "npm", "run", "start:prod" ]