FROM node:12.18-alpine
WORKDIR /usr/src/app
COPY ["package.json",  "./"]
RUN npm install -g @nestjs/cli
RUN npm install && mv node_modules ../
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
