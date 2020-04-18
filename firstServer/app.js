var http = require('http');
var fs = require('fs');


// // manual way to pipe
// myReadStream.on('data', function(chunk){
//     console.log('new chunk received');
//     console.log(chunk);
// });


var server = http.createServer(function(req, res){
    console.log(`request was made to ${req.url}`);
    res.writeHead(200, {'Content-Type': 'text/plain'}); //status, content type
    var myReadStream = fs.createReadStream(__dirname + '/readme.txt', 'utf8');
    myReadStream.pipe(res);
});

server.listen(3000, '127.0.0.1');  // port, ip address
console.log('listening to port 3000')