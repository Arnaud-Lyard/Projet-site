const mongoose = require('mongoose')

const Schema = mongoose.Schema

const announcementSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  technology: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
}, { timestamps: true })

module.exports = mongoose.model('Announcement', announcementSchema)