const Sequelize = require('sequelize')
const db = require('../database/dbLeague.js')

module.exports = db.sequelize.define(
  'tbl_team_listings',
  {
    list_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    team_name: {
      type: Sequelize.STRING
    },
    team_id: {
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false
  }
)