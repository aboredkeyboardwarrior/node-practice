var http = require('http');
var fs = require('fs');


// // manual way to pipe
// myReadStream.on('data', function(chunk){
//     console.log('new chunk received');
//     console.log(chunk);
// });


var server = http.createServer(function(req, res){
    console.log(`request was made to ${req.url}`);
    if (req.url === '/home' || req.url === '/'){
        res.writeHead(200, )
    }
    res.writeHead(200, {'Content-Type': 'text/html'}); //status, content type - text, html
    var myReadStream = fs.createReadStream(__dirname + '/index.html', 'utf8');
    myReadStream.pipe(res);
    var http = require('http');
var fs = require('fs');


// // manual way to pipe
// myReadStream.on('data', function(chunk){
//     console.log('new chunk received');
//     console.log(chunk);
// });


    res.writeHead(200, {'Content-Type': 'application/json'}); //status, content type - text, html
    var myObj = {
        name: 'ryu',
        job: 'Ninja',
        age: 29
    };
    res.end(JSON.stringify(myObj));
});

server.listen(3000, '127.0.0.1');  // port, ip address
console.log('listening to port 3000');

