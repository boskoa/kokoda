const express = require("express");
const path = require("path");
const cors = require("cors");
const compression = require("compression");
const { errorHandler } = require("./utils/errorHandler");
const testRouter = require("./controllers/test");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const chatsRouter = require("./controllers/chats");
const messagesRouter = require("./controllers/messages");
const { createServer } = require("http");

const app = express();
const server = createServer(app);

process.on("uncaughtException", function (err) {
  console.log(err);
});

app.use(express.json());
app.use(cors());
app.use(compression({ threshold: 20000 }));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.static("dist"));

// routers
app.use("/api/test", testRouter);
app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);
app.use("/api/chats", chatsRouter);
app.use("/api/messages", messagesRouter);

app.all("/*", (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.use(errorHandler);

module.exports = server;
