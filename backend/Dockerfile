FROM node:20.11.1-alpine

RUN apk update && apk add --no-cache docker-cli

WORKDIR /app

COPY package*.json ./

RUN npm i

RUN npm install -g dotenv-cli

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

VOLUME [ "/app/submissions/" ]

CMD [ "npm", "run", "start:migrate:prod" ]