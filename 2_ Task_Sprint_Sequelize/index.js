const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const conn = require('./db/conn')

const Tarefas = require('./models/Tarefas')

const tarefasRoutes = require('./routes/tarefasRoutes')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use(express.static('public/images'));
app.use('/', tarefasRoutes)

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
    // Conexão

conn.sync().then(() => {
    app.listen(3000)
}).catch(err => console.log(err))