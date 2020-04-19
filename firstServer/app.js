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
        res.writeHead(200, {'Content-Type': 'text/html'}); //status, content type - text, html
        fs.createReadStream(__dirname + '/index.html', 'utf8').pipe(res);
    } else if(req.url === '/contact'){
        res.writeHead(200, {'Content-Type': 'text/html'}); //status, content type - text, html
        fs.createReadStream(__dirname + '/contact.html', 'utf8').pipe(res);
    } else if(req.url === '/api/ninjas'){
        var ninjas = [{name:'ryu', age:23}, {name:'yoshi', age: 21}];
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(ninjas));
    } else{
        res.writeHead(404, {'Content-Type': 'text/html'}); //status, content type - text, html
        fs.createReadStream(__dirname + '/error.html', 'utf8').pipe(res);   
    }

// // manual way to pipe
// myReadStream.on('data', function(chunk){
//     console.log('new chunk received');
//     console.log(chunk);
// });


    // res.writeHead(200, {'Content-Type': 'application/json'}); //status, content type - text, html
    // var myObj = {
    //     name: 'ryu',
    //     job: 'Ninja',
    //     age: 29
    // };
    // res.end(JSON.stringify(myObj));
});

server.listen(3000, '127.0.0.1');  // port, ip address
console.log('listening to port 3000');

