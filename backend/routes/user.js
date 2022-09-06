const requireAuth = require("../middlewares/requireAuth");
const controller = require("../controllers/userController");

const express = require('express')

const router = express.Router()

// Get all users
router.get('/all', controller.allAccess)

// Get user profile
router.get('/profile', requireAuth.verifyToken, controller.userBoard)

// Get moderator profile
router.get('/mod', requireAuth.verifyToken, requireAuth.isModerator, controller.moderatorBoard)

// Get admin profile
router.get('/admin', requireAuth.verifyToken, requireAuth.isAdmin, controller.adminBoard)

module.exports = router