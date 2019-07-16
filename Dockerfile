FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN apt-get update && apt-get install vim nano -y && apt-get install nmap -y

RUN npm install pm2 -g

RUN npm install

COPY . .

CMD ["pm2-runtime", "process.yml"]