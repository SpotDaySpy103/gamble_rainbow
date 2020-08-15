const Sequelize = require('sequelize')
const db = require('../database/dbLeague.js')

module.exports = db.sequelize.define(
  'tbl_bets',
  {
    bets_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: Sequelize.INTEGER,
    },
    matches_id: {
      type: Sequelize.INTEGER
    },
    bet_team: {
      type: Sequelize.STRING
    },
    bet_money: {
      type: Sequelize.DOUBLE
    },
    time_add: {
      type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    status: {
      type: Sequelize.STRING,
    }
  },
  {
    timestamps: false
  }
)