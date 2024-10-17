const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async(req, res, next) => {
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization; // Get the authorization header

    // Check if authorization header starts with "Bearer"
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1]; // Extract the token after "Bearer"

        // Verify the token
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                console.error("Token verification failed:", err.message); // Log the error for debugging
                res.status(401);
                throw new Error("User is not authorized, token failed verification");
            }

            // Attach decoded user info to the request object
            req.user = decoded.User;
            next(); // Continue to the next middleware
        });
    } else {
        // If no authHeader or token is provided
        res.status(401);
        throw new Error("User is not authorized or token is missing");
    }
});

module.exports = validateToken;