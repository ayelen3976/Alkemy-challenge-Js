
const Sequelize = require('sequelize');
const db = require('../config/database');

const Balance = db.define('balance', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  concept: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

 Balance.sync().then(() => {
  console.log('table created');
}); 
module.exports = Balance;