const { Chat } = require("../models");
const { tokenExtractor } = require("../utils/tokenExtractor");
const router = require("express").Router();

router.post("/", tokenExtractor, async (req, res, next) => {
  if (!("group" in req.body)) {
    return res.status(401).json({ error: "Missing required data" });
  }

  if (req.body.group) {
    if (!req.body.members.length || !req.body.admins.length) {
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
