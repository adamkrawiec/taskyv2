FROM node:18-alpine

ENV DB_HOST host.docker.internal

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
