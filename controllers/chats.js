const { Chat } = require("../models");
const { tokenExtractor } = require("../utils/tokenExtractor");
const router = require("express").Router();

router.post("/", tokenExtractor, async (req, res, next) => {
  if (!req.body.members.length || !req.body.admins.length) {
    console.log(
      "FOOOOOOOOOOOOOOOOO",
      req.body.members.length,
      req.body.admins.length,
    );
    return res.status(401).json({ error: "Missing required data" });
  }

  try {
    const chat = await Chat.create(req.body);
    return res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
