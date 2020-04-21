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
// var item1 = todo({item: 'Get Flowers'}).save(err => {
//     if (err) throw err;
//     console.log('item logged ')
// });

//fake data
// var data = [{item: 'get milk'}, {item: 'walk dog'}, {item:'code'}];

var urlencodedParser = bodyParser.urlencoded({extended:false});

module.exports = (app) => {
    //to generate todo list
    app.get('/todo', (req,res) => {
        //get data from mongodb and pass into view
        //finds all items in collection, else specify data in {} of targetted items
        todo.find({}, (err, data) => {
            if (err) throw err;
            res.render('todo', {todos: data});
        });
    });

    //to add todos
    app.post('/todo', urlencodedParser, (req,res) => {
        //add body of request to mongodb
        var newTodo = todo(req.body).save(function(err,data){
            if (err) throw err;
            res.json(data);
        });
    });

    //to delete task
    app.delete('/todo/:item', function(req, res){
        //delete requested item from mongodb
        //replaces - from url encoding with spaces
        todo.find({item: req.params.item.replace(/\-/g, " ")}).deleteOne((err, data)=>{
            if (err) throw err;
            res.json(data);
        });

        // //replace spaces with -
        // //use filter array method to cycle through array, put each item into function as todo arg
        // // if false returned, delete from array, else keep
        // data = data.filter(function(todo){
        //     return todo.item.replace(/ /g, "-") !== req.params.item;
        // });
        // res.json(data);
    });
}