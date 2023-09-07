# syntax=docker/dockerfile:1

FROM node:18
WORKDIR /App
COPY . .
RUN npm install
CMD ["npm", "start"]
EXPOSE 3000