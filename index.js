const app = require("./app");
const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");

async function start() {
  await connectToDatabase();
  app.listen(PORT, function () {
    console.log("Server is running on port", PORT);
  });
}

start();
