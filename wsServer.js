const WebSocket = require("ws");
const app = require("./app");

function handleWebsocketConnections(expressServer) {
  const wsServer = new WebSocket.Server({
    noServer: true,
    path: "/websockets",
  });

  expressServer.on("upgrade", (req, connection, head) => {
    wsServer.handleUpgrade(req, connection, head, (connection) => {
      wsServer.emit("connection", connection, req);
    });
  });

  wsServer.on("connection", (connection) => {
    console.log("New client connected.", wsServer.clients.size);

    app.locals.wsClients = wsServer.clients;
  });

  return wsServer;
}

module.exports = handleWebsocketConnections;
