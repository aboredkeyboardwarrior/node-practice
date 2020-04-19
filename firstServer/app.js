var express = require('express');

var app = express();
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
app.get('/contact', function(req, res){
    res.send('this is the contact');
});
app.get('/profile/:id', function(req, res){
    var fakeData = {age: 29, job: 'ninja', letters:['a', 'b', 'c']};
    res.render('profile', {person: req.params.id, data:fakeData});
});

// // using url parameters without view engine
// app.get('/profile/:id', function(req, res){
//     res.render('you requested to see profile with id ' + req.params.id);
// });

app.listen(3000);
console.log('listening to port 3000');

