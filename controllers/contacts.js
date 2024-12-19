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

module.exports = router;
