const Sequelize = require('sequelize')
const mysql2 = require('mysql2')
const db = {}
const sequelize = new Sequelize('vento99', 'root', 'SPR0D6MQE', {
  host: 'localhost',
  dialect: 'mysql',
  dialectModule: mysql2,
  operatorsAliases: false,
  timezone: '+07:00',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db