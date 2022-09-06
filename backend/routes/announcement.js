const express = require('express')

const {
  getAnnouncements, 
  getAnnouncement, 
  createAnnouncement, 
  deleteAnnouncement, 
  updateAnnouncement
} = require('../controllers/announcementController')
const announcementImageUpload = require('../middlewares/multerConfig');

// const verifySignUp = require("../middlewares/verifySignUp");
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router()

// require auth for all announcement routes
router.use([requireAuth.verifyToken, requireAuth.isAdmin])


// router.get(
//   "/admin",
//   [requireAuth.verifyToken, requireAuth.isAdmin],
//     controller.adminBoard
// );

// GET all announcements
router.get('/', getAnnouncements)

// GET a single announcement
router.get('/:id', getAnnouncement)

// POST a new announcement
router.post('/', announcementImageUpload, createAnnouncement)

// DELETE a announcement
router.delete('/:id', deleteAnnouncement)

// UPDATE a announcement
router.patch('/:id', announcementImageUpload, updateAnnouncement)



module.exports = router