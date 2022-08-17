const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const mysql = require('mysql')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

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

app.get('/', (req, res) => {
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
    // Rota pra editar tarefa
app.get('/edit/:id', (req, res) => {
        const id = req.params.id
        const sql = `SELECT * FROM tarefas WHERE id = ${id}`
        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err)
                return
            }
            const tarefa = data[0]
            console.log(tarefa)
            res.render('editartarefa', { tarefa })
        })
    })
    // Rota pra remover tarefa
app.post('/remove/:id', (req, res) => {
        const id = req.params.id
        const sql = `DELETE FROM tarefas WHERE id = ${id}`
        conn.query(sql, function(err) {
            if (err) {
                console.log(err)
                return
            }
            res.redirect('/')
        })
    })
    // Rota de Home page 
app.get('/add', (req, res) => {
    res.render('home')
})

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
})

app.post('/editartarefa', (req, res) => {
    const id = req.body.id
    const tarefaNome = req.body.nome;
    const sql = `UPDATE tarefas SET nome = ('${tarefaNome}') WHERE id = ${id}`
    conn.query(sql, function(err) {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/')
    })
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