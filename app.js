const http = require("http");

http.createServer(function(_req, res) {
	res.write("Here is a string...");
	res.end();
}).listen(3000);

console.log("Server started on port 3000");
