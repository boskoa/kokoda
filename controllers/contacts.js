const { Op } = require("sequelize");
const { User } = require("../models");
const { tokenExtractor } = require("../utils/tokenExtractor");
const router = require("express").Router();

router.get("/", tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const contacts = await User.findAll({
      where: { id: { [Op.in]: user.contacts } },
      attributes: ["id", "name", "username"],
    });

    return res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.patch("/", tokenExtractor, async (req, res, next) => {
  if (!req.body?.contact) {
    return res.status(401).json({ error: "Missing data" });
  }
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const contact = await User.findByPk(req.body.contact, {
      attributes: ["id", "name", "username"],
    });
    if (user.contacts.includes(contact.id)) {
      return res.status(400).json({ message: "Already in contacts" });
    }
    user.set({ contacts: [...user.contacts, contact.id] });
    await user.save();

    return res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
