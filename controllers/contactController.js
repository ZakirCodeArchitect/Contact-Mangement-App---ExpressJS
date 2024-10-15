const asyncHandler = require("express-async-handler")
    // Now with the help of asynHandler you dont need to use try-catch block

//@desc GET all Contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async(req, res) => {
    res.status(200).json({ message: "Get all the Contacts" })
})

//@desc POST all Contacts
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async(req, res) => {
    console.log("The Request Body is : ", req.body);
    const { name, email, contact } = req.body;
    if (!name || !email || !contact) {
        res.status(400);
        throw new Error("All Fields are required")
    }

    res.status(201).json({ message: "Create a contact" })
})

//@desc GET Contact
//@route GET/api/contacts/:id
//@access public
const getContact = asyncHandler(async(req, res) => {
    res.status(200).send({ message: `Get a contact of ${req.params.id}` })
})

//@desc UPDATE all Contacts
//@route UPDATE /api/contacts/:id
//@access public
const updateContact = asyncHandler(async(req, res) => {
    res.status(200).json({ message: `Update contact for ${req.params.id}` })
})

//@desc DELETE all Contacts
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async(req, res) => {
    res.status(200).json({ message: `Delete contact for ${req.params.id}` })
})

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };