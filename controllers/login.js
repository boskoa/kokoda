const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const { SECRET } = require("../utils/config");

router.post("/", async (req, res, next) => {
  console.log("FOOOOOOOOOOOOOOOOOOOOO", req.body.username);
  if (req.body.username === "" || req.body.password === "") {
    return res.status(401).json({ error: "No credentials entered" });
  }

  const user = await User.findOne({ where: { username: req.body.username } });
  if (!user) {
    return res.status(401).json({ error: "That username is not registered" });
  }

  try {
    const passwordCorrect = await bcrypt.compare(
      req.body.password,
      user.passwordHash,
    );

    if (!passwordCorrect) {
      return res.status(401).json({ error: "Wrong password" });
    }

    const userForToken = {
      id: user.id,
      username: user.username,
    };

    const token = jwt.sign(userForToken, SECRET);
    return res.status(200).send({
      token,
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      address: user.address,
      admin: user.admin,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
