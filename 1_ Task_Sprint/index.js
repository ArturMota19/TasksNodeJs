const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const mysql = require('mysql')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use(express.static('public/images'));

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')


// POST PARA ADICIONAR TAREFA

app.post('/addTarefa', (req, res) => {
    const tarefaNome = req.body.nome;
    const prioridade = req.body.select;
    var Alta = 0
    var Media = 0
    var Baixa = 0
    if (prioridade == 'Alta') {
        Alta = 1
    } else if (prioridade == 'Media') {
        Media = 1
    } else {
        Baixa = 1
    }
    const sql = `INSERT INTO tarefas (nome, prioridade, prioridadeAlta, prioridadeMedia, prioridadeBaixa) 
    VALUES ('${tarefaNome}','${prioridade}','${Alta}','${Media}','${Baixa}')`
    conn.query(sql, function(err) {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/')
    })
})

// POST PARA REMOVER TAREFA
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


// ROTA PRA PEGAR TODAS AS TAREFAS

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

// ROTAS PRA PRIORIDADES

app.get('/prioridadealta', (req, res) => {
    const sql = 'SELECT * FROM tarefas WHERE prioridade = "Alta" '
    conn.query(sql, function(err, data) {
        if (err) {
            console.log(err)
            return
        }
        const tarefas = data
        console.log(tarefas)
        res.render('prioridadealta', { tarefas })
    })
})

app.get('/prioridademedia', (req, res) => {
    const sql = 'SELECT * FROM tarefas WHERE prioridade = "Media" '
    conn.query(sql, function(err, data) {
        if (err) {
            console.log(err)
            return
        }
        const tarefas = data
        console.log(tarefas)
        res.render('prioridademedia', { tarefas })
    })
})

app.get('/prioridadebaixa', (req, res) => {
    const sql = 'SELECT * FROM tarefas WHERE prioridade = "Baixa" '
    conn.query(sql, function(err, data) {
        if (err) {
            console.log(err)
            return
        }
        const tarefas = data
        console.log(tarefas)
        res.render('prioridadebaixa', { tarefas })
    })
})

// ROTA PRA ADICIONAR TAREFA
app.get('/add', (req, res) => {
    res.render('addtarefas')
})

// ROTA PRA EDITAR TAREFA

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

app.post('/editartarefa', (req, res) => {
    const id = req.body.id
    const tarefaNome = req.body.nome;
    const prioridade = req.body.select;
    const sql = `UPDATE tarefas SET nome = ('${tarefaNome}'), prioridade = ('${prioridade}') WHERE id = ${id}`
    conn.query(sql, function(err) {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/')
    })
})

// Conex??o

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