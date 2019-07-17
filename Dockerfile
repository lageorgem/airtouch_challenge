FROM node:latest
ENV MONGO_HOST=mongo
RUN mkdir -p /usr/src/airtouch_challenge
WORKDIR /usr/src/airtouch_challenge
COPY package.json /usr/src/airtouch_challenge/
COPY ./build /usr/src/airtouch_challenge
RUN apt-get update
RUN apt-get install -y build-essential
RUN apt-get install -y python
RUN npm install

EXPOSE 3000

## Script from the web to wait for mongo to start up
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

## Run the wait script until mongo is up
CMD /wait && npm start
