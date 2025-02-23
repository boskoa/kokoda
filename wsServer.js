const WebSocket = require("ws");
const app = require("./app");
const http = require("http");

const httpServer = http.createServer();

function handleWebsocketConnections(expressServer) {
  const wsServer = new WebSocket.Server({
    server: httpServer,
    path: "/websockets",
  });

  expressServer.on("upgrade", (req, connection, head) => {
    wsServer.handleUpgrade(req, connection, head, (connection) => {
      wsServer.emit("connection", connection, req);
    });
  });

  wsServer.on("connection", (connection, request) => {
    let _path, params, id;
    if (request.url.includes("?")) {
      [_path, params] = request.url.split("?");
      id = params.split("=")[1];
      connection.clientId = id;
      console.log("New client connected.", wsServer.clients.size);
    }
  });

  app.locals.wsClients = wsServer.clients;

  return wsServer;
}

module.exports = handleWebsocketConnections;
