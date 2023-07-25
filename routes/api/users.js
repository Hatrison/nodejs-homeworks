const express = require("express");
const {
  register,
  login,
  logout,
  current,
  updateSubscription,
} = require("../../controllers/users");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/current", current);

router.patch("/subscription", updateSubscription);

module.exports = router;
