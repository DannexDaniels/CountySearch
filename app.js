var http = require("http");
var fs = require("fs");

http.createServer(function (req, res) {
    if (req.url === '/home' || req.url === '/'){
        res.writeHead(200,{'Content-Type':'text/html'});
        fs.createReadStream('index.html').pipe(res);
    }else{
        res.end("Hello There");
    }
}).listen(3000);

console.log("server is running");