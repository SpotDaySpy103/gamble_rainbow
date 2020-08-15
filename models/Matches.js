const Sequelize = require('sequelize')
const db = require('../database/dbLeague.js')

module.exports = db.sequelize.define(
  'tbl_matches',
  {
    list: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    matches_id: {
      type: Sequelize.INTEGER,
    },
    team_home: {
      type: Sequelize.STRING
    },
    team_away: {
      type: Sequelize.STRING
    },
    twitch_link: {
      type: Sequelize.STRING
    },
    youtube_link: {
      type: Sequelize.STRING
    },
    competition_league: {
      type: Sequelize.STRING
    },
    start_at: {
      type: Sequelize.DATE
    },
    status: {
      type: Sequelize.STRING
    },
    score_home: {
      type: Sequelize.STRING
    },
    score_away: {
      type: Sequelize.STRING
    },
    result: {
      type: Sequelize.STRING
    },
    rating_home: {
      type: Sequelize.DOUBLE
    },
    rating_away: {
      type: Sequelize.DOUBLE
    }
  },
  {
    timestamps: false
  }
)