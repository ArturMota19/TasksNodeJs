const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const mysql = require('mysql')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')


app.post('/addTarefa', (req, res) => {
    const tarefaNome = req.body.nome;
    const sql = `INSERT INTO tarefas (nome) VALUES ('${tarefaNome}')`
    conn.query(sql, function(err) {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/')
    })
})

app.get('/tarefas', (req, res) => {
    const sql = 'SELECT * FROM tarefas'
    conn.query(sql, function(err, data) {
        if (err) {
            console.log(err)
            return
        }
        const tarefas = data
        console.log(tarefas)
        res.render('tarefas', { tarefas })
    })
})

app.get('/', (req, res) => {
    res.render('home')
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