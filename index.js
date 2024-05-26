const app = require("./app");

async function start() {
  app.listen(3003, function () {
    console.log("Server is running on port", 3003);
  });
}

start();
