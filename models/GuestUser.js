const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'tbl_guest_user',
  {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING
    },
    user_pass: {
      type: Sequelize.STRING
    },
    user_credit: {
      type: Sequelize.STRING
    },
    bank_account: {
      type: Sequelize.STRING
    },
    bank_name: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
)