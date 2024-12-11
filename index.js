//const app = require("./wsServer");
const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");
const server = require("./wsServer");

async function start() {
  await connectToDatabase();
  server.listen(PORT, function () {
    console.log("Server is running on port", PORT);
  });
  /* server.listen(8080, () => {
    console.log("WebSocket server running on port 8080");
  }); */
}

start();
