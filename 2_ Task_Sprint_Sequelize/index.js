const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const conn = require('./db/conn')

const Tarefas = require('./models/Tarefas')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use(express.static('public/images'));

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')


// POST PARA ADICIONAR TAREFA

app.post('/addTarefa', async(req, res) => {
    const nome = req.body.nome;
    const prioridade = req.body.select;
    var prioridadeAlta = 0
    var prioridadeMedia = 0
    var prioridadeBaixa = 0
    if (prioridade == 'Alta') {
        prioridadeAlta = 1
    } else if (prioridade == 'Media') {
        prioridadeMedia = 1
    } else {
        prioridadeBaixa = 1
    }
    await Tarefas.create({ nome, prioridade, prioridadeAlta, prioridadeMedia, prioridadeBaixa })
    res.redirect('/add')
})

// ROTA PRA ADICIONAR TAREFA
app.get('/add', (req, res) => {
    res.render('addtarefas')
})

// POST PARA REMOVER TAREFA
/*
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
*/
// Conexão

conn.sync().then(() => {
    app.listen(3000)
}).catch(err => console.log(err))