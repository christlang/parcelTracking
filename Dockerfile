FROM node:8.11.3
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
COPY config/server-docker.json config/server.json
EXPOSE 8080
USER root
CMD [ "npm", "start" ]