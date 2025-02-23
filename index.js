const { connectToDatabase } = require("./utils/db");
const app = require("./app");
const { PORT } = require("./utils/config");
const handleWebsocketConnections = require("./wsServer");

async function start() {
  await connectToDatabase();

  const server = app.listen(PORT, function () {
    console.log("Server is running on port", PORT);
  });

  handleWebsocketConnections(server);
}

start();
