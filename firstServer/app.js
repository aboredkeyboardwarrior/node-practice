var http = require('http');
var fs = require('fs');

var myReadStream = fs.createReadStream(__dirname + '/readme.txt', 'utf8');
var myWriteStream = fs.createWriteStream(__dirname + '/writeme.txt');
 
myReadStream.pipe(myWriteStream);


// // manual way to pipe
// myReadStream.on('data', function(chunk){
//     console.log('new chunk received');
//     console.log(chunk);
// });


// var server = http.createServer(function(req, res){
//     console.log(`request was made to ${req.url}`);
//     res.writeHead(200, {'Content-Type': 'text/plain'}); //status, content type
//     res.end('hello, world') 
// });

// server.listen(3000, '127.0.0.1');  // port, ip address
// console.log('listening to port 3000')