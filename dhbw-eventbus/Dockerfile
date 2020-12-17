FROM node:alpine

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

EXPOSE ${EVENTBUS_PORT}

CMD ["npm", "start"]