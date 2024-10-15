//@desc GET all Contacts
//@route GET /api/contacts
//@access public
const getContacts = (req, res) => {
    res.status(200).json({ message: "Get all the Contacts" })
}

//@desc POST all Contacts
//@route POST /api/contacts
//@access public
const createContact = (req, res) => {
    res.status(201).json({ message: "Create a contact" })
}

//@desc GET Contact
//@route GET/api/contacts/:id
//@access public
const getContact = (req, res) => {
    res.status(200).send({ message: `Get a contact of ${req.params.id}` })
}

//@desc UPDATE all Contacts
//@route UPDATE /api/contacts/:id
//@access public
const updateContact = (req, res) => {
    res.status(200).json({ message: `Update contact for ${req.params.id}` })
}

//@desc DELETE all Contacts
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = (req, res) => {
    res.status(200).json({ message: `Delete contact for ${req.params.id}` })
}

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };