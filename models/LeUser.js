const Sequelize = require('sequelize')
const db = require('../database/dbLeague.js')

module.exports = db.sequelize.define(
  'tbl_users',
  {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_name: {
      type: Sequelize.STRING,
    },
    user_pass: {
      type: Sequelize.STRING
    },
    user_credit: {
      type: Sequelize.FLOAT
    }
  },
  {
    timestamps: false
  }
)