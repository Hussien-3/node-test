const express = require('express')
const mongoose = require('mongoose')
const router = require('./router/rout')
const jsend = require('./utility/statustext')
const cors = require('cors')

require('dotenv').config()

const app = express()

app.use(express.json())

app.use(cors())

app.use('/api/test', router)

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({status: err.statusText, massge: err.massage})
})

app.all('{*split}', (req, res) => {
    res.status(404).json({status:jsend.fail, massage:'api not found'})
})

mongoose.connect(process.env.DB_URL).then(() => {
    console.log("database is conect")
})

app.listen(process.env.PORT || 7000, () => {
    console.log(`i listen on port ${process.env.PORT}`)
})