FROM node:16.13.1-alpine
WORKDIR /usr/local/app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "start"]
