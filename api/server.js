
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');

const port = process.env.PORT || process.env.HTTP_SERVER_PORT || 3000;

const app = express();

 // health check endpoint
 app.all('/health', (req, res) => {
    res.json({ health: 'OK' });
    res.end();
  });

   // this is not a public domain
   app.all('/', (req, res) => {
    res.json({ permission: 'This is not a public domain' });
    res.end();
  });

  app.listen(port, () => {
    console.log(`🚀 http endpoint ready at http://localhost:${port}/`);
  });

console.log('hello');