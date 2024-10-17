const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the username"]
    },

    email: {
        type: String,
        required: [true, "Please add user email address"],
        unique: [true, "This Email address already exists"]
    },

    password: {
        type: String,
        required: [true, "Please add user passowrd"],
    }

}, {
    timeStamps: true,
});

module.exports = mongoose.model("User", userSchema);