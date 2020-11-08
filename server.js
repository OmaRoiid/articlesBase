const express = require("express")
const path =require("path")
const homeRoute=require('./route/homeRoute')
const app = express();
var bodyParser = require('body-parser')
const port =  3000

//setup mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/articleBD', { useNewUrlParser: true, useUnifiedTopology: true })
let db =mongoose.connection;
//check the DB connection
db.once('open',()=>{
    console.log("Connected to DB")
})
db.on('error',(err)=>{
    console.log(err)
})

//load view engine
app.set('views',path.join(__dirname,'views'))
// https://www.npmjs.com/package/pug
app.set('view engine', 'pug')

//setup bodyParser 
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//set bootstrab folder 


// homePage Route 
homeRoute(app)

app.listen(port, () => {
  console.log(` listening at http://localhost:${port}`)
})