### DEV Environmental Science  ###
FROM node:14.17.3 AS development

ARG user
ARG uid

#  Navigate to the container working directory 
WORKDIR /usr/src/app
#  Copy package.json
COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npm", "start:dev"]