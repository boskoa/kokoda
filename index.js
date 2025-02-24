const { connectToDatabase } = require("./utils/db");
const app = require("./app");
const { PORT } = require("./utils/config");
const http = require("http");
const WebSocket = require("ws");

async function start() {
  await connectToDatabase();

  const httpServer = http.createServer();

  const wsServer = new WebSocket.Server({
    server: httpServer,
    path: "/websockets",
  });

  httpServer.on("request", app);

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

  httpServer.listen(
    process.env.NODE_ENV === "development" ? 3003 : PORT,
    function () {
      console.log("Server is running on port", PORT);
    },
  );
}

start();
