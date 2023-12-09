const express = require('express');
const cors = require('cors');
const SentimentIntensityAnalyzer = require('vader-sentiment');
const keyword_extractor = require("keyword-extractor");

const expressRouter = express.Router();

const reviews = require('../models/reviews');

expressRouter.use(cors());

expressRouter.post('/add', (req, res) => {

});

const getSentimentText = (compound) => {
    if (compound >= 0.05) {
        return 'Very positive';
    } else if (compound > 0 && compound < 0.05) {
        return 'Positive';
    } else if (compound > -0.05 && compound < 0) {
        return 'Negative';
    } else if (compound <= -0.05) {
        return 'Very negative';
    } else {
        return 'Neutral';
    }
}

expressRouter.get('/all', async (req, res) => {
    const reviewsList = await reviews.findAll();
    res.json(reviewsList);
    res.end();

});

expressRouter.post('/bulkadd', async (req, res) => {


    try {
        const body = req.body;

        // console.log('body', body);
        // save to db
        const source = body.reviewSource || 'unknown';
        const newReviews = body.newReviews.map((review) => {
            const intensity = SentimentIntensityAnalyzer.polarity_scores(review.review);

            const keywords = keyword_extractor.extract(review.review, {
                language: "english",
                remove_digits: true,
                return_changed_case: true,
                remove_duplicates: false
            });

            

            return {
                source: source,
                username: review.username,
                reviewText: review.review,
                rating: review.rating,
                reviewTime: review.time,
                createdAt: new Date(),
                sentimentsNegative: intensity.neg,
                sentimentsPositive: intensity.pos,
                sentimentsNeutral: intensity.neu,
                sentimentsCompound: intensity.compound,
                sentimentText: getSentimentText(intensity.compound),
                keywords: keywords.join(','),
            };
        });

        const result = await reviews.bulkCreate(newReviews);

             
    
        res.json({ status: 'OK', count: result?.length || 0  });
    } catch (error) {
        console.log(error);
        res.json({ status: 'Failed'  });
    }

   
    res.end();
    
});


module.exports = expressRouter;