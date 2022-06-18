FROM node:16.13.1-alpine

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm ci

COPY . .

RUN npm run prisma:generate

RUN npm run build

CMD [ "npm", "start" ]