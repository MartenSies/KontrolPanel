FROM node:12.2.0-alpine

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

COPY src /app/src
COPY public /app/public
COPY tsconfig.json tsconfig.json

CMD ["npm", "start"]