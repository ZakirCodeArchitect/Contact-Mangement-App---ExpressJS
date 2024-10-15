const express = require("express");
const dotenv = require("dotenv").config();

// creating an app
const app = express();

const port = process.env.PORT || 3001;

// route for contacts
app.get("/api/contacts", (req, res) => {
    res.status(200).json({ message: "Get all the Contacts" })
})

// listening on port
app.listen(port, () => {
    console.log(`Listening on Port ${port}`)
})