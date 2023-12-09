
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const reviews = require('./models/reviews');

const port = process.env.PORT || process.env.HTTP_SERVER_PORT || 3000;

const app = express();


const findone = async (id) => {
  try {
      const review = await reviews.findOne({ where: { id: id } });
      return review;
  }
  catch (err) {
      console.log(err);
      return err;
  }
}

 // health check endpoint
 app.all('/health',async ( req, res) => {

    const reviewOne =  await findone(1);

    res.json({ health: 'OK', 
    db: reviewOne || 'OK'
  });
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