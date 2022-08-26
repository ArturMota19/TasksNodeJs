const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Tarefas = db.define('Tarefas', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prioridade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prioridadeAlta: {
        type: DataTypes.TINYINT,
    },
    prioridadeMedia: {
        type: DataTypes.TINYINT,
    },
    prioridadeBaixa: {
        type: DataTypes.TINYINT,
    },
})

module.exports = Tarefas