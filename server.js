const dataJSON = require('./dataJSON.json')

const express = require('express')
const app = express()
const port = 5000
const rateLimit = require('express-rate-limit')


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
})

app.use(limiter)

app.get('/', function (req, res) {
    try {
        res.json(dataJSON)
    } catch (err) {
        res.status(500).json({ mesaage: err.mesaage })
    }
})

app.get('/random', function (req, res) {
    try {
        res.json(dataJSON[Math.floor(Math.random() * 4)])
    } catch (err) {
        res.send(500).json({ message: err.mesaage })
    }
})

app.get('/::id', function (req, res) {

    try {
        res.json(dataJSON.filter(function (item) {
            return item.id == (req.params.id)
        }))
    } catch (err) {
        res.send(400).json({ message: err.mesaage })
    }
})

app.get('/completed', function (req, res) {
    try {
        res.json(dataJSON.filter(function (item) {
            return item.completed == true
        }))
    } catch (err) {
        res.status(500).json({ mesaage: err.mesaage })
    }

})

app.get('/notcompleted', function (req, res) {
    try {
        res.json(dataJSON.filter(function (item) {
            return item.completed == false
        }))
    } catch (err) {
        res.status(500).json({ mesaage: err.mesaage })
    }
})

app.listen(port, () => {
    console.log('server is running');
})