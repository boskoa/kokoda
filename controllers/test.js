const router = require("express").Router();

router.get("/", (req, res) => {
  return res.status(200).send("HAI MARK");
});

module.exports = router;
