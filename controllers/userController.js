const asyncHandler = require("express-async-handler")
const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

//@desc POST user
//@route POST /api/users/register
//@access public
// Now with the help of asynHandler you dont need to use try-catch block
const registerUser = asyncHandler(async(req, res) => {
    const { username, email, password } = req.body; // destrcuturing the data
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!")
    }

    // now we have to check if user already exists or not.
    const userAvailable = await user.findOne({ email })
    if (userAvailable) {
        res.status(400)
        throw new Error("User already registered1")
    }

    // now we will register the user, but we'll do few validations :
    // checking if password is valid for that using bcrypt library.

    // bycrpt is also gonna return us promise , that's why we'll use here await.
    // Hash password

    // 10 = salt rounds
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password", hashedPassword);
    const User = await user.create({
        username,
        email,
        password: hashedPassword,
    })
    console.log(`User Created : ${User}`);
    if (User) {
        res.status(201).json({ _id: User.id, email: User.email });
    } else {
        res.status(404);
        throw new Error("User data is not valid")
    }

    res.json({ message: "Register the user" })
})


//@desc POST user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const User = await user.findOne({ email });

    // user exists and compare password users enters with hashed password in the database
    if (User && (await bcrypt.compare(password, User.password))) { // Fixed User.password
        // payload which we will embed in the token.
        const accessToken = jwt.sign({
                User: {
                    username: User.username,
                    email: User.email,
                    id: User.id,
                },
            },
            process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" } // Corrected to 'expiresIn'
        );
        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Email or password is not valid");
    }
});



//@desc GET user
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async(req, res) => {
    res.json(req.user)
})

module.exports = { registerUser, loginUser, currentUser }