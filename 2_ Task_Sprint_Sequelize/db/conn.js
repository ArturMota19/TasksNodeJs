const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('tasksequelize', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize