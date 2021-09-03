const express = require('express')
const mongoose = require('mongoose')
var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')


const cors = require('cors')
require('dotenv').config()
const app = express()

const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const categoryRoute = require('./routes/category')
const productRoute = require('./routes/product')
const orderRoute = require('./routes/order')

const PORT = 8000

app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser())


app.use('/api', authRoute)
app.use('/api', userRoute)
app.use('/api', categoryRoute)
app.use('/api', productRoute)
app.use('/api', orderRoute)



mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => { console.log("DB CONNECTED") })
    .catch(() => { console.log("OOPPS!!! DATABASE") })

app.listen(PORT, () => { console.log(`Server is running at ${PORT}`) })