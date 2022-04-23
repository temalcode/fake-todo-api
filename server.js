const dataJSON = require('./dataJSON.json')

const express = require('express')
const app = express()
app.use(express.static(__dirname + '/views'))

const rateLimit = require('express-rate-limit')
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
})

const cors = require('cors')
app.use(cors())

const Router = require('express').Router()

app.get('/', function(req, res){
    res.sendFile('index.html')
})


Router.get('/', function (req, res) {
    try {
        res.json(dataJSON)
    } catch (err) {
        res.status(500).json({ mesaage: err.mesaage })
    }
})

Router.get('/random', function (req, res) {
    try {
        res.json(dataJSON[Math.floor(Math.random() * 4)])
    } catch (err) {
        res.send(500).json({ message: err.mesaage })
    }
})

Router.get('/::id', function (req, res) {

    try {
        res.json(dataJSON.filter(function (item) {
            return item.id == (req.params.id)
        }))
    } catch (err) {
        res.send(400).json({ message: err.mesaage })
    }
})

Router.get('/completed', function (req, res) {
    try {
        res.json(dataJSON.filter(function (item) {
            return item.completed == true
        }))
    } catch (err) {
        res.status(500).json({ mesaage: err.mesaage })
    }

})

Router.get('/notcompleted', function (req, res) {
    try {
        res.json(dataJSON.filter(function (item) {
            return item.completed == false
        }))
    } catch (err) {
        res.status(500).json({ mesaage: err.mesaage })
    }
})

app.use('/api', Router)
app.use(limiter)
app.listen(process.env.PORT || 5000, () => console.log('server is running'))
