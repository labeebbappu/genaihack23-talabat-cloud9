
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const reviews = require('./models/reviews');
const reviewsRouter = require('./routes/reviews');

const port = process.env.PORT || process.env.HTTP_SERVER_PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const { origin } = req.headers;

  res.setHeader('Access-Control-Allow-Origin', origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  next();
  /*
  // request policing
  const requestOrigin = req.get('origin');
  if (requestOrigin === 'https://gogo.tfmsworld.com'
        || requestOrigin === 'http://gogo.tfmsworld.com'
        || requestOrigin === 'http://localhost:3000') {
    next();
  } else {
    res.json({
      status: 'failed',
      message: 'Error: Access denied, Unauthorized access. This is not a public domain',
      error_code: '5001',
    });
  } */
});

app.use('/reviews', reviewsRouter);


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