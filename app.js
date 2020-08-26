var express = require('express')
var ejs = require('ejs')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var mainRoutes = require('./routes/main')

mongoose.connect('mongodb+srv:', {useNewUrlParser: true, useUnifiedTopology: true})

var app = express()

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(mainRoutes);

app.set('view engine', 'ejs')

app.listen(9000, "0.0.0.0", function() {
    console.log('Node.js listening on port ' + 9000)
})