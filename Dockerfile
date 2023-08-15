FROM node:18-alpine

ENV DB_HOST database-1.czpikqppbelo.eu-west-1.rds.amazonaws.com

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
