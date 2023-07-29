const express = require("express");
const {
  register,
  login,
  logout,
  current,
  updateSubscription,
  updateAvatar,
} = require("../../controllers/users");
const { authorization, upload } = require("../../middlewares");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", authorization, logout);

router.get("/current", authorization, current);

router.patch("/subscription", authorization, updateSubscription);

router.patch("/avatars", authorization, upload.single("avatar"), updateAvatar);

module.exports = router;
