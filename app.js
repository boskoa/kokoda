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
const contactsRouter = require("./controllers/contacts");
const unseensRouter = require("./controllers/unseens");
const backgroundsRouter = require("./controllers/backgrounds");
const avatarsRouter = require("./controllers/avatars");
const chatAvatarsRouter = require("./controllers/chatAvatars");

const app = express();

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
app.use("/api/contacts", contactsRouter);
app.use("/api/unseens", unseensRouter);
app.use("/api/backgrounds", backgroundsRouter);
app.use("/api/avatars", avatarsRouter);
app.use("/api/chatAvatars", chatAvatarsRouter);

app.all("/*", (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.use(errorHandler);

module.exports = app;
