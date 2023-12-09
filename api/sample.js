const reviews = require('./models/reviews');

// const findone = async (id) => {
//     try {
//         const review = await reviews.findOne({ where: { id: id } });
//         return review;
//     }
//     catch (err) {
//         console.log(err);
//         return 'error';
//     }
// }

// const findall = async () => {
//     try {
//         const review = await reviews.findAll();
//         return review;
//     }
//     catch (err) {
//         console.log(err);
//     }
// }

const SentimentIntensityAnalyzer = require('vader-sentiment');
// create a function to sentiment text from cpmpound score like Very Positive, positive, negative, Very Negative, neutral
const sentimentText = (compound) => {
    if (compound >= 0.05) {
        return 'Very Positive';
    } else if (compound > 0 && compound < 0.05) {
        return 'Positive';
    } else if (compound > -0.05 && compound < 0) {
        return 'Negative';
    } else if (compound <= -0.05) {
        return 'Very Negative';
    } else {
        return 'Neutral';
    }
}



const simpleCall = async () => {

    
    const input = 'VADER is very smart, handsome, and funny';
const intensity = SentimentIntensityAnalyzer.polarity_scores(input);
console.log(intensity, sentimentText(intensity.compound));
  
} 

simpleCall();