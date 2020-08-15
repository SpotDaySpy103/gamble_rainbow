const Sequelize = require('sequelize')
const db = require('../database/dbLeague.js')

module.exports = db.sequelize.define(
  'tbl_logs',
  {
    logs_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    
    matches_id: {
      type: Sequelize.INTEGER
    },
    status: {
      type: Sequelize.INTEGER
    },
    time: {
      type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
  },
  {
    timestamps: false
  }
)