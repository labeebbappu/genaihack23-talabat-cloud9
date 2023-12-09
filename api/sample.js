const reviews = require('./models/reviews');

const findone = async (id) => {
    try {
        const review = await reviews.findOne({ where: { id: id } });
        return review;
    }
    catch (err) {
        console.log(err);
        return 'error';
    }
}

const findall = async () => {
    try {
        const review = await reviews.findAll();
        return review;
    }
    catch (err) {
        console.log(err);
    }
}

const simpleCall = async () => {
 const reviewOne =  await findone(1);

 console.log(reviewOne  , {reviewOne});
} 

simpleCall();