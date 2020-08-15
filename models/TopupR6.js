const Sequelize = require('sequelize')
const db = require('../database/dbLeague.js')

module.exports = db.sequelize.define(
  'tbl_topup',
  {
    topup_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_name: {
      type: Sequelize.STRING
    },
    topup_amount: {
      type: Sequelize.INTEGER
    },
    status: {
      type: Sequelize.STRING
    },
    date_add: {
      type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
  },
  {
    timestamps: false
  }
)