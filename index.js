const express = require("express");
const server = require("http").createServer();
const app = express();
const PORT = 3000;

app.get("/", function (_req, res) {
  res.sendFile("index.html", { root: __dirname });
});

server.on("request", app);
server.listen(PORT, function () {
  console.log("Listening on port 3000");
});

/** Web Sockets */

const WebSocketServer = require("ws").Server;
const wss = new WebSocketServer({ server });

wss.addListener("connection", function connection(ws) {
  const numClients = wss.clients.size;
  console.log(`Clients connected | ${numClients}`);

  wss.broadcast(`Current visitors: ${numClients}`);

  if (ws.readyState === ws.OPEN) {
    ws.send(`Welcome to my server`);
  }

  ws.on("close", function close() {
    console.log(`A client has disconnceted`);
  });
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};
