const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const bodyParser = require('body-parser')

const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

const todoList = []

app.get('/:id', (req, res) => {
    const id = req.params
    return res.json(todoList[id])
})

app.get('/', (req, res) => {
    res.render('home', { todoList: todoList })
})

// Criando nova tarefa
app.post('/', urlencodedParser, (req, res) => {
    const nome = req.body.nome
    todoList.push(nome)
    res.status(201).redirect('/');
})

// Atualizando tarefa
app.put('/:id', (req, res) => {
    const id = req.params
    const nome = req.body.nome
    todoList[id] = nome
    return res.json(todoList)
})

// Excluir algum curso
app.delete('/:id', (req, res) => {
    const id = req.params
    todoList.splice(id, 1)
    return res.json({
        message: 'A tarefa foi deletada.'
    })

})

app.listen(3000, () => {
    console.log('Task 1 Rodando.')
})