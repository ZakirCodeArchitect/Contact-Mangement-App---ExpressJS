const express = require("express")
const router = express.Router();


/* REQUEST METHODS*/

// GET
router.route("/").get((req, res) => {
        res.status(200).json({ message: "Get all the Contacts" })
    })
    // POST
router.route("/").post((req, res) => {
        res.status(200).json({ message: "Create a contact" })
    })
    // GET particular
router.route("/:id").get((req, res) => {
        res.status(200).send({ message: `Get a contact of ${req.params.id}` })
    })
    // PUT
router.route("/:id").put((req, res) => {
        res.status(200).json({ message: `Update contact for ${req.params.id}` })
    })
    // DELETE
router.route("/:id").delete((req, res) => {
    res.status(200).json({ message: `Delete contact for ${req.params.id}` })
})


module.exports = router;