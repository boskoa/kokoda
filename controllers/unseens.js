const { Unseen } = require("../models");
const { tokenExtractor } = require("../utils/tokenExtractor");

const router = require("express").Router();

router.get("/", tokenExtractor, async (req, res, next) => {
  try {
    const unseens = await Unseen.findAll({
      where: { userId: req.decodedToken.id },
    });
    return res.status(200).json(unseens);
  } catch (error) {
    next(error);
  }
});

router.post("/", tokenExtractor, async (req, res, next) => {
  if (req.body.count === undefined || req.body.chatId === undefined) {
    return res.status(401).json({ error: "Missing data" });
  }

  try {
    let unseen = await Unseen.findOne({
      where: { userId: req.decodedToken.id, chatId: req.body.chatId },
    });
    let count = req.body.count;

    if (unseen) {
      count = req.body.count !== 0 ? unseen.count + req.body.count : 0;
      unseen.set({ count });
      await unseen.save();
      return res.status(200).json(unseen);
    }

    unseen = await Unseen.create({
      ...req.body,
      userId: req.decodedToken.id,
    });
    return res.status(200).json(unseen);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
