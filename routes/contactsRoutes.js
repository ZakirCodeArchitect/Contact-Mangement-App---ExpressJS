const express = require("express")
const router = express.Router();
const { getContacts, createContact, getContact, updateContact, deleteContact } = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

/* REQUEST METHODS*/

router.use(validateToken); // if you have all the routes as protected and you need to validate the token on all the routes.

// GET and POST
router.route("/").get(getContacts).post(createContact);

// GET particular and PUT and DELETE
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;