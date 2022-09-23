// import dotenv to store our password of DB
const dotenv = require('dotenv')
//add path to config
dotenv.config({ path: './config.env' })
//import express
const express = require('express')
//call express
const app = express()
//import DB Connection
require('./db/connection')
//use express json use after db conn and before url routers
app.use(express.json())
//use cookie to access cookies
const cookieParser = require('cookie-parser')
app.use(cookieParser());
//import auth(router or routes or url paths)
app.use(require('./router/auth'))
//PORT in config.env
const PORT = process.env.PORT;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

//listener
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})