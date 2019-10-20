FROM node:latest
WORKDIR /app
COPY . .
EXPOSE 3031
RUN npm install
CMD ["npm", "start"]
