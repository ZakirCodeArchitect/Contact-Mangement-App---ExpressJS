const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")

//@desc GET all Contacts
//@route GET /api/contacts
//@access public
// Now with the help of asynHandler you dont need to use try-catch block
const getContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts)
})

//@desc POST all Contacts
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async(req, res) => {
    console.log("The Request Body is : ", req.body);
    const { name, email, phone } = req.body; // here we destcutured so we can just use; name, email... as it is.
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All Fields are required")
    }

    const contact = await Contact.create({
        name,
        email,
        phone
    });

    res.status(201).json(contact)
})

//@desc GET Contact
//@route GET/api/contacts/:id
//@access public
const getContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id); // specific data searching
    if (!contact) {
        res.status(404);
        throw new Error("Contact not Found");
    }
    res.status(200).send(contact);
})

//@desc UPDATE all Contacts
//@route UPDATE /api/contacts/:id
//@access public
const updateContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404)
        throw new Error("Contact Not Found")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body, { new: true }
    )

    res.status(200).json(updatedContact)
})

//@desc DELETE all Contacts
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404)
        throw new Error("Contact Not Found")
    }

    await Contact.remove(); // deleting the contact from the DB
    res.status(200).json(contact)
})

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };