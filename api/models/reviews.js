const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Reviews = sequelize.define(
  "reviews",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    source: { type: DataTypes.STRING, allowNull: false }, // google, apple, facebook, etc
    username: { type: DataTypes.STRING, allowNull: false },
    reviewText: { type: DataTypes.STRING, allowNull: false },
    rating: { type: DataTypes.DOUBLE, allowNull: false },
    reviewTime: { type: DataTypes.DATE, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    sentimentsNegative: { type: DataTypes.DOUBLE, allowNull: true },
    sentimentsPositive: { type: DataTypes.DOUBLE, allowNull: true },
    sentimentsNeutral: { type: DataTypes.DOUBLE, allowNull: true },
    sentimentsCompound: { type: DataTypes.DOUBLE, allowNull: true },
    sentimentText: { type: DataTypes.STRING, allowNull: true },
    keywords: { type: DataTypes.STRING, allowNull: false },
  },
  {
    timestamps: false,
    tableName: "reviews",
    indexes: [
      { unique: false, fields: ["keywords"] },
      { unique: false, fields: ["source"] },
      { unique: false, fields: ["reviewText"] },
      { unique: false, fields: ["reviewTime"] },
      { unique: false, fields: ["createdAt"] },
      { unique: false, fields: ["sentimentsNegative"] },
      { unique: false, fields: ["sentimentsPositive"] },
      { unique: false, fields: ["sentimentsNeutral"] },
      { unique: false, fields: ["sentimentsCompound"] },
      { unique: false, fields: ["sentimentText"] },
    ],
  }
);

module.exports = Reviews;
