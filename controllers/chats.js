const { Chat, User, Message } = require("../models");
const { tokenExtractor } = require("../utils/tokenExtractor");
const router = require("express").Router();

router.get("/:id", tokenExtractor, async (req, res, next) => {
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

module.exports = router;
