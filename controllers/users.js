const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../models");
const { tokenExtractor } = require("../utils/tokenExtractor");

router.get("/:id", tokenExtractor, async (req, res, next) => {
  try {
    const sender = await User.findByPk(req.decodedToken.id);
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["passwordHash"] },
    });
    const senderInUsersContacts = user.contacts.includes(sender.id);
    console.log(senderInUsersContacts);

    if (!senderInUsersContacts && !sender.admin) {
      return res.status(401).json({ error: "Not authorized" });
    }
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  if (
    !req.body.username ||
    !req.body.name ||
    !req.body.email ||
    !req.body.password
  ) {
    return res.status(401).json({ error: "Missing required data" });
  }

  if (req.body.password.length < 6) {
    return res.status(401).json({ error: "Password is too short" });
  }

  const passwordHash = await bcrypt.hash(req.body.password, 10);
  const userData = { ...req.body, passwordHash };
  delete userData.password;
  if (userData.admin) delete userData.admin;

  try {
    await User.create(userData);
    const newUser = await User.findOne({
      where: { username: userData.username },
      attributes: { exclude: "passwordHash" },
    });
    return res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
