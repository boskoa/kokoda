const WebSocket = require("ws");
//const app = require("./app");

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

  wsServer.on("connection", (connection, request) => {
    let _path, params, id;
    if (request.url.includes("?")) {
      [_path, params] = request.url.split("?");
      id = params.split("=")[1];
      console.log("BAAAAAAAAAAAAAAAAAAAAAR", id);
      connection.clientId = id;
      console.log("New client connected.", wsServer.clients.size);
    }
    //app.locals.wsClients = wsServer.clients;

    connection.on("message", (message) => {
      console.log("FOOOOOO", JSON.parse(message), wsServer.clients.size);
      const parsedMessage = JSON.parse(message);
      wsServer.clients.forEach((c) => {
        console.log("CLIENT IDS", c.clientId);
        if ([1, 2, 3, 4, 5, 6, 7].includes(parseInt(c.clientId))) {
          console.log("HAAAAAAAAAAAAAAAAAAAAAI");
          c.send(JSON.stringify(parsedMessage));
        }
      });
    });
  });

  return wsServer;
}

module.exports = handleWebsocketConnections;
