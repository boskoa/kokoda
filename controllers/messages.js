const { Message } = require("../models");
const { tokenExtractor } = require("../utils/tokenExtractor");
const router = require("express").Router();

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

module.exports = router;
