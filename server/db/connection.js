//import mongoose
const mongoose = require('mongoose')

//FOR DATABASE(accessing url from config.env)
const db = process.env.DATABASE;

mongoose.connect(db)
    .then(() => {
        console.log('connection successful ')
    }).catch(err => {
        console.log('connection error')
    })