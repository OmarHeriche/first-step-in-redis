FROM node:alpine
COPY . /app
WORKDIR /app
CMD node bestCourse.js