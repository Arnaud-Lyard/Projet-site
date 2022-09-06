const express = require('express')

// Middlewares functions
// const { verifySignUp } = require('../middlewares/verifySignup')

// controller functions
const { loginUser, signupUser } = require('../controllers/authController')

const verifySignUp = require("../middlewares/verifySignUp");

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', verifySignUp, signupUser)



module.exports = router