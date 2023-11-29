const express = require('express')
const app = express()
const customers = require('./customs.json')

const port = process.env.PORT || 3001
app.get('/', (req, res) => {
    res.send("Hello world")
})

app.get('/customers', (req, res) => {
    res.send(customers)
})

app.listen(port, () => {
    console.log('App is listening to port ${port}')
})