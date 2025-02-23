const { connectToDatabase } = require("./utils/db");
const app = require("./app");
const { PORT, PRODUCTION_PORT } = require("./utils/config");
const handleWebsocketConnections = require("./wsServer");

const APP_PORT =
  process.env.NODE_ENV === "development" ? PORT : PRODUCTION_PORT;

async function start() {
  await connectToDatabase();

  const server = app.listen(APP_PORT, function () {
    console.log("Server is running on port", APP_PORT);
  });

  handleWebsocketConnections(server);
}

start();
