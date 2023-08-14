const [DataTypes] = require('sequelize');
const { db } = require('../database/config');

const Meal = db.define('meals', {
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
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  restaurantid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'delete'),
    allowNull: false,
    defaultValue: 'active',
  },
});

module.exports = Meal;
