const [DataTypes] = require('sequelize');
const { db } = require('../database/config');

const Restaurant = db.define('restaurants', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGERs,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'delete'),
    allowNull: false,
    defaultValue: 'active',
  },
});

module.exports = Restaurant;
