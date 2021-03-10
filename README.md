# DHT

DHT is a simple URL Shortener that I made in my spare time. It is a express application with static HTML included.

## Installation

Ensure that NodeJS is present and that you have an instance of MongoDB that you can connect to.

In `utils/database/mongo.js` find the lines which correspond to the database credentials and make sure to change them to yours.

```javascript
const db = monk("mongodb://localhost/dht");
```

## Docker

I have included a `DockerFile` which will allow you to upload this to a registry and run it on your own.

```Docker
FROM node:13.12.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

COPY . ./

CMD ["npm", "start"]

```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Frameworks used

[Express](https://expressjs.com/) - for APIs and static HTML code

[MongoDB](https://www.mongodb.com/) - MongoDB as a database
