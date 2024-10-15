const express = require("express");
const dotenv = require("dotenv").config();

// creating an app
const app = express();

const port = process.env.PORT || 3001;

// route - adding middleware in our express project
app.use("/api/contacts", require("./routes/contactsRoutes"))

// listening on port
app.listen(port, () => {
    console.log(`Listening on Port ${port}`)
})