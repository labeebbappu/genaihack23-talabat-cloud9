const dotenv = require('dotenv');
dotenv.config();

const sequelize = require('./sequelize');
const Reviews = require('./models/reviews');

console.log('hello');

const sync = async () => {
    console.log('syncing');
    try {
        await sequelize.sync({ force: true });
        console.log('synced');
    }
    catch (err) {
        console.log(err);
    }
}

sync();