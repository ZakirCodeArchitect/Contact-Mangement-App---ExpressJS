const express = require("express")
const router = express.Router();
const { getContacts, createContact, getContact, updateContact, deleteContact } = require("../controllers/contactController")

/* REQUEST METHODS*/

// GET and POST
router.route("/").get(getContacts).post(createContact);

// GET particular and PUT and DELETE
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;