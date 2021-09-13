const express = require('express')
const hbs = require('hbs')
const path = require('path')
const port = process.env.PORT || 8000
const app = express()

const staticFilePath = path.join(__dirname, '../public')
const viewsFilePath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

hbs.registerPartials(path.join(partialPath))
app.set('view engine', 'hbs')
app.set('views', viewsFilePath)
app.use(express.static(staticFilePath))

app.get('/', (req, res) => {
    res.render('index')
})
app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/weather', (req, res) => {
    res.render('weather')
})

app.get('*', (req, res) => {
    res.render('404')
})

app.listen(port, () => {
    console.log(`Successfully connected at port ${port}`);
})