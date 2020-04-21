var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
const result = dotenv.config();

if (result.error) {
  throw result.error;
}

console.log('using database creds: ' + result.parsed);

// replace # with %23
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
console.log(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`)
//schema
var todoSchema = new mongoose.Schema({
    item: String
});

// model name as stored as collection on mongodb, schema used
var todo = mongoose.model('todo', todoSchema);
var item1 = todo({item: 'Get Flowers'}).save(function(err){
    if (err) throw err;
    console.log('item')
});

//fake data
var data = [{item: 'get milk'}, {item: 'walk dog'}, {item:'code'}];

var urlencodedParser = bodyParser.urlencoded({extended:false});

module.exports = function(app){
    //to generate todo list
    app.get('/todo', function(req,res){
        res.render('todo', {todos: data});
    });

    //to add todos
    app.post('/todo', urlencodedParser, function(req,res){
        //add body of request to end of data array
        data.push(req.body);
        //returns to client new data array
        //jQuery in client-side will reload page, new get request to todo page with controller containing new data array
        res.json(data);
    });

    //to delete task
    app.delete('/todo/:item', function(req, res){
        //replace spaces with -
        //use filter array method to cycle through array, put each item into function as todo arg
        // if false returned, delete from array, else keep
        data = data.filter(function(todo){
            return todo.item.replace(/ /g, "-") !== req.params.item;
        });
        res.json(data);
    });
}