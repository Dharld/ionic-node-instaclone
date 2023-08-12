const express = require("express");
const { signup, login, signout } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/signout", signout);

module.exports = {
  routes: router,
};
