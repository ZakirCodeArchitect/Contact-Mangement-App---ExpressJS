const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

// creating an app
const app = express();

const port = process.env.PORT || 3001;

// this will provide us body-parser when getting request from the client
// Help us to parse the data stream which we will get from the client
app.use(express.json());

// route - adding middleware in our express project
app.use("/api/contacts", require("./routes/contactsRoutes"))

// middleware - error handler
app.use(errorHandler)

// listening on port
app.listen(port, () => {
    console.log(`Listening on Port ${port}`)
})