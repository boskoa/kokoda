const { Message, User, Chat } = require("../models");
const { tokenExtractor } = require("../utils/tokenExtractor");
const router = require("express").Router();

router.get("/:id", tokenExtractor, async (req, res, next) => {
  try {
    const message = await Message.findByPk(req.params.id);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }
    return res.status(200).json(message);
  } catch (error) {
    next(error);
  }
});

router.post("/", tokenExtractor, async (req, res, next) => {
  if (!req.body.chatId || !req.body.text) {
    return res.status(401).json({ error: "Missing required data" });
  }

  const newData = { ...req.body, userId: req.decodedToken.id };

  try {
    const chat = await Chat.findByPk(req.body.chatId);

    if (!chat.group) {
      const receiverId = chat.members.filter(
        (m) => m !== req.decodedToken.id,
      )[0];
      const receiver = await User.findByPk(receiverId);
      if (receiver.blockedUsers.includes(req.decodedToken.id)) {
        return res.status(401).json({ error: "You are blocked by this user" });
      }
    }

    const message = await Message.create(newData);

    req.app.locals.wsClients.forEach((c) => {
      if (chat.members.includes(parseInt(c.clientId))) {
        c.send(JSON.stringify(message));
      }
    });
    return res.status(200).json(message);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", tokenExtractor, async (req, res, next) => {
  try {
    const sender = await User.findByPk(req.decodedToken.id);
    const message = await Message.findByPk(req.params.id);

    if (!message) return res.status(404).json({ error: "No such message" });

    const chat = await Chat.findByPk(message.chatId);

    if (
      sender?.id !== message.userId &&
      !sender?.admin &&
      !sender.admin &&
      !chat.admins?.includes(sender.id)
    ) {
      return res.status(401).json({ error: "Not authorized" });
    }

    if (req.body.text === message.text) {
      return res.status(400).json({ error: "Nothing to change" });
    }

    message.set({ text: req.body.text });
    await message.save();

    req.app.locals.wsClients.forEach((c) => {
      if (chat.members.includes(parseInt(c.clientId))) {
        c.send(JSON.stringify(message));
      }
    });

    return res.status(200).json(message);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", tokenExtractor, async (req, res, next) => {
  try {
    const sender = await User.findByPk(req.decodedToken.id);
    const message = await Message.findByPk(req.params.id);

    if (!message) return res.status(404).json({ error: "No such message" });

    const chat = await Chat.findByPk(message.chatId);

    if (
      sender?.id !== message.userId &&
      !sender?.admin &&
      chat.admins &&
      !chat.admins.includes(req.decodedToken.id)
    ) {
      return res.status(401).json({ error: "Not authorized" });
    }

    await message.destroy();

    return res.status(200).send("Message deleted");
  } catch (error) {
    next(error);
  }
});

router.get("/chat/:id", tokenExtractor, async (req, res, next) => {
  const [offset, limit] = req.query.pagination.split(",");

  try {
    const sender = await User.findByPk(req.decodedToken.id);
    const chat = await Chat.findByPk(req.params.id);

    if (!chat) return res.status(404).json({ error: "No such chat" });

    if (!sender.admin && !chat.members?.includes(sender.id)) {
      return res.status(401).json({ error: "Not authorized" });
    }

    const messages = await Message.findAll({
      where: { chatId: req.params.id },
      offset,
      limit,
      order: [["id", "DESC"]],
    });

    return res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
