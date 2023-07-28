const express = require("express");
const {
  register,
  login,
  logout,
  current,
  updateSubscription,
} = require("../../controllers/users");
const { authorization } = require("../../middlewares");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", authorization, logout);

router.get("/current", authorization, current);

router.patch("/subscription", authorization, updateSubscription);

module.exports = router;
