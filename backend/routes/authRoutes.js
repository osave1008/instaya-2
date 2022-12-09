const express = require("express");
const router = express.Router();
const {Register, Login} = require("../controllers/authControllers");


router.post("/Register", Register);

router.post("/Login", Login);

module.exports = router;