const Sequelize = require('sequelize')
const db = require('../database/dbLeague.js')

module.exports = db.sequelize.define(
  'tbl_team',
  {
    team_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    team_name: {
      type: Sequelize.STRING
    },
    team_points: {
      type: Sequelize.STRING
    },
    team_matches: {
      type: Sequelize.STRING
    },
    team_matches_wdl: {
      type: Sequelize.STRING
    },
    team_rounds_wl: {
      type: Sequelize.STRING
    },
    team_diff: {
      type: Sequelize.STRING
    },
  },
  {
    timestamps: false
  }
)