const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User, Message, Chat } = require("../models");
const { tokenExtractor } = require("../utils/tokenExtractor");
const { Op } = require("sequelize");

router.get("/", tokenExtractor, async (_req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["passwordHash"] },
    });

    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["passwordHash"] },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
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

router.patch("/:id", tokenExtractor, async (req, res, next) => {
  const sender = await User.findByPk(req.decodedToken.id);
  const user = await User.findByPk(req.params.id);
  //deactivate; add field in DB - active
  if (sender.id !== user.id && !sender.admin) {
    return res.status(401).json({ error: "Not authorized" });
  }

  if (!req.body) {
    return res.status(200).send("Nothing to change");
  }

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  try {
    const newData = { ...req.body };
    if (newData.password) {
      const passwordHash = await bcrypt.hash(newData.password, 10);
      newData.passwordHash = passwordHash;
      delete newData.password;
    }
    if (newData.admin && !sender.admin) delete newData.admin;
    user.set(newData);
    await user.save();
    const updatedUser = await User.findByPk(user.id, {
      attributes: { exclude: "passwordHash" },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});
// Check when all controllers are finished
router.delete("/:id", tokenExtractor, async (req, res, next) => {
  const sender = await User.findByPk(req.decodedToken.id);
  const user = await User.findByPk(req.params.id);

  if (!sender.admin) {
    return res.status(401).json({ error: "Not authorized" });
  }

  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }

  try {
    await Message.destroy({ where: { senderId: sender.id } });
    const userIsMember = await Chat.findAll({
      where: { members: { [Op.contains]: [user.id] } },
    });
    const userIsAdmin = await Chat.findAll({
      where: { admins: { [Op.contains]: [user.id] } },
    });

    for (const chat of userIsMember) {
      chat.members = chat.members.filter((m) => m !== user.id);
      await chat.save();
    }

    for (const chat of userIsAdmin) {
      chat.admins = chat.admins.filter((m) => m !== user.id);
      await chat.save();
    }

    await user.destroy();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
