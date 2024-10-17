const express = require("express");
const { registerUser, loginUser, currentUser } = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");


const router = express.Router();

router.post("/register", registerUser)

router.post("/login", loginUser)

// and if some of the routes are private , you can use this way to validate the token.
router.get("/current", validateToken, currentUser)

module.exports = router;