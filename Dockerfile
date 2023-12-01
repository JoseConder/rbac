FROM node
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 27017
CMD PORT=27017 node app.js