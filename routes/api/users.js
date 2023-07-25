const express = require("express");
const { register, login, logout, current } = require("../../controllers/users");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/current", current);

router.patch("/subscription", current);

module.exports = router;
