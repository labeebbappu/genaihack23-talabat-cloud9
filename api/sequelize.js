const dotenv = require('dotenv');
dotenv.config();

const { Sequelize } = require('sequelize');

const HOST = process.env.SQL_DATABASE_HOST;
const SCHEMA = process.env.SQL_DATABASE_NAME;
const USER = process.env.SQL_DATABASE_USER;
const PASSWORD = process.env.SQL_DATABASE_PASSWORD;

const sequelize = new Sequelize(SCHEMA, USER, PASSWORD, {
  host: HOST,
  logging: false,
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true
    }

  },
  pool: {
    min: 1,
    max: 1000,
    acquire: 30000,
    idle: 10000,
    maxUses: 10000
  }
});

sequelize.authenticate();

module.exports = sequelize;

// what is default sequelize pool max connections?
// https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor
