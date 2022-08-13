### DEV Environmental Science  ###
FROM node:14.17.3 AS development

#  Navigate to the container working directory 
WORKDIR /usr/src/app
#  Copy package.json
COPY package*.json ./

RUN npm install glob rimraf
RUN npm ci
COPY . .
RUN npm run build

CMD ["npm", "start:dev"]