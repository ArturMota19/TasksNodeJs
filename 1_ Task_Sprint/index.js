const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const mysql = require('mysql')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

const todoList = []

app.post('/', (req, res) => {
    const tarefaNome = req.body.nome;
    todoList.push(tarefaNome);
    res.redirect("/");
})

app.get('/', (req, res) => {
    res.render('home', { todoList: todoList })
})

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
})

conn.connect(function(err) {
    if (err) {
        console.log(err)
    }
    console.log('MYSQL conectado')
    app.listen(3000, () => {
        console.log('Task 1 Rodando.')
    })
})