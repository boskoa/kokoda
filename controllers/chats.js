const { Chat, User, Message } = require("../models");
const { tokenExtractor } = require("../utils/tokenExtractor");
const router = require("express").Router();

router.get("/:id", tokenExtractor, async (req, res, next) => {
  // Implement pagination based on date
  try {
    const sender = await User.findByPk(req.decodedToken.id);
    const chat = await Chat.findByPk(req.params.id, {
      include: { model: Message, order: [["id", "ASC"]] },
    });

    if (!sender.admin && !chat.members.includes(sender.id)) {
      return res.status(401).json({ error: "Not authorized" });
    }

    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    return res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
});

router.post("/", tokenExtractor, async (req, res, next) => {
  if (!("group" in req.body)) {
    return res.status(401).json({ error: "Missing required data" });
  }

  if (req.body.group) {
    if (!req.body.name) {
      return res.status(401).json({ error: "Missing name" });
    }

    if (!req.body.members?.length || !req.body.admins?.length) {
      return res.status(401).json({ error: "Missing required data" });
    }
  } else {
    if (req.body.members?.length !== 2 || req.body.admins) {
      return res.status(401).json({ error: "Wrong data" });
    }
    req.body.public = false;
  }

  try {
    const chat = await Chat.create(req.body);
    return res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", tokenExtractor, async (req, res, next) => {
  try {
    const sender = await User.findByPk(req.decodedToken.id);
    const chat = await Chat.findByPk(req.params.id);

    if (!sender.admin && !chat.admins?.includes(sender.id)) {
      return res.status(401).json({ error: "Not authorized" });
    }

    chat.set(req.body);
    await chat.save();
    return res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", tokenExtractor, async (req, res, next) => {
  try {
    const sender = await User.findByPk(req.decodedToken.id);
    const chat = await Chat.findByPk(req.params.id);

    if (!sender.admin) {
      return res.status(401).json({ error: "Not authorized" });
    }

    await Message.destroy({ where: { chatId: chat.id } });
    await chat.destroy();
    return res.status(200).send("Chat deleted");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
