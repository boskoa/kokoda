const { WebSocketServer } = require("ws");
const http = require("http");

const server = http.createServer();
const wss = new WebSocketServer({ server });

wss.on("connection", (connection) => {
  console.log("New client connected.");
  /*
  connection.on("message", (message) => {
    console.log("Received message:", message.toString());
    wss.cleints.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  connection.on("close", () => {
    console.log("Client disconnected.");
  });
  */
});

module.exports = { server };
