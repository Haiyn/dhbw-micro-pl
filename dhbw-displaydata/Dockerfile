FROM node:alpine

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

EXPOSE ${DISPLAYDATA_PORT}

CMD ["npm", "start"]