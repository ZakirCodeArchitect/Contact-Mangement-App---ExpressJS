const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc GET all Contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
});

//@desc POST all Contacts
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async(req, res) => {
    console.log("Received request to create contact"); // Initial log

    // Check if req.user exists (verify if user is authenticated)
    if (!req.user) {
        console.log("User not authenticated");
        return res.status(401).json({ message: "User is not authenticated" });
    }

    console.log("User ID:", req.user.id); // Log user ID

    const { name, email, phone } = req.body;

    // Ensure all required fields are present
    if (!name || !email || !phone) {
        console.log("Missing fields:", { name, email, phone }); // Log missing fields
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Attempt to create a new contact
        const contact = await Contact.create({
            name,
            email,
            phone,
            user_id: req.user.id, // Ensure the contact is associated with the user
        });

        console.log("Contact created successfully:", contact); // Log contact details
        return res.status(201).json(contact); // Send response with created contact
    } catch (error) {
        console.error("Error creating contact:", error); // Log the error if one occurs
        return res.status(500).json({ message: "Server error: Failed to create contact" });
    }
});


//@desc GET Contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not Found");
    }

    // Check if the contact belongs to the logged-in user
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Not authorized to access this contact");
    }

    res.status(200).send(contact);
});

//@desc UPDATE all Contacts
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id); // fetching the contact from the database using the ID
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }

    // Check if the contact belongs to the logged-in user
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Not authorized to update this contact");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body, { new: true }
    );

    res.status(200).json(updatedContact);
});

//@desc DELETE all Contacts
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }

    // Check if the contact belongs to the logged-in user
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Not authorized to delete this contact");
    }

    await contact.deleteOne(); // Use deleteOne instead of deprecated remove
    res.status(200).json({ message: "Contact deleted", contact });
});

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };