FROM node:alpine

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

EXPOSE ${RECEIVE_DATA_PORT}

CMD ["npm", "start"]