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

  try {
    const message = await Message.create({
      ...req.body,
      senderId: req.decodedToken.id,
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
      sender?.id !== message.senderId ||
      !sender?.admin ||
      !chat.admins.includes(req.decodedToken.id)
    ) {
      return res.status(401).json({ error: "Not authorized" });
    }

    if (req.body.text === message.text) {
      return res.status(400).json({ error: "Nothing to change" });
    }

    message.set({ text: req.body.text });
    await message.save();

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
      sender?.id !== message.senderId ||
      !sender?.admin ||
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

module.exports = router;
