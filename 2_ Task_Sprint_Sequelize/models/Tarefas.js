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
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    prioridadeMedia: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    prioridadeBaixa: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
})

module.exports = Tarefas