const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
//ROUTE
const authRoute = require("./routers/auth")
const userRoute = require('./routers/user')

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
dotenv.config()

app.use("/v1/auth", authRoute)
app.use("/v1/user", userRoute)
mongoose.connect(process.env.MONGODB_URL, () => console.log('CONNECTED TO DATABASE!'))
const port = process.env.PORT || 8080
app.listen(port, () => console.log('http://localhost:' + port))