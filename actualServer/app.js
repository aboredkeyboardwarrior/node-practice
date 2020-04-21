var express = require('express');
var todoController = require('./controllers/todoController');
require('dotenv').config()
var app = express();


//set up template engine
app.set('view engine', 'ejs');


//static files
// maps assets all routes to public file path since first arg (route) not specified
app.use(express.static('./public'))


//fire controllers
todoController(app);


//listen to port
app.listen(3000);
console.log('listening to port 3000')