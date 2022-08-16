const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

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

app.get('/:id', (req, res) => {
    const id = req.params.id
    return res.json(todoList)
})

app.get('/', (req, res) => {
    res.render('home', { todoList: todoList })
})


app.listen(3000, () => {
    console.log('Task 1 Rodando.')
})