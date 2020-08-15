const Sequelize = require('sequelize')
const db = require('../database/dbLeague.js')

module.exports = db.sequelize.define(
  'tbl_admin',
  {
    admin_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    admin_name: {
      type: Sequelize.STRING,
    },
    admin_pass: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
)