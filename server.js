const express = require("express")
const path =require("path")
const homeRoute=require('./route/homeRoute')
const app = express();
var bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const flash=require('connect-flash')
const session = require('express-session')
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
app.use(express.static('public'))
// express session 
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}))
// express messages 
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
// Express Validator Middleware
app.use(expressValidator())

//setup bodyParser 
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())



// homePage Route 
homeRoute(app)

app.listen(port, () => {
  console.log(` listening at http://localhost:${port}`)
})