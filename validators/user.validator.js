const { body } = require('express-validator');

const registerUserValidation = [
    body("username")
        .notEmpty().withMessage("Username mustn't be empty")
        .isLength({ min: 3 }).withMessage("Username must be at least 3 characters"),

    body("email")
        .notEmpty().withMessage("Email mustn't be empty")
        .isEmail().withMessage("Invalid email"),

    body("password")
        .notEmpty().withMessage("Email mustn't be empty")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
]

module.exports = { registerUserValidation }