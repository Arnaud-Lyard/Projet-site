const Announcement = require('../models/announcementModel')
const mongoose = require('mongoose')
const fs = require('fs');

// get all announcements
const getAnnouncements = async (req, res) => {
  const announcements = await Announcement.find({}).sort({createdAt: -1})

  res.status(200).json(announcements)
}

// get a single announcement
const getAnnouncement = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such announcement'})
  }

  const announcement = await Announcement.findById(id)

  if (!announcement) {
    return res.status(404).json({error: 'No such announcement'})
  }

  res.status(200).json(announcement)
}

// create a new announcement
const createAnnouncement = async (req, res) => {
  const {title, description, technology} = req.body

  let emptyFields = []
  
  if(!req.file){
    emptyFields.push('image')
  }
  if (!title) {
    emptyFields.push('title')
  }
  if (!description) {
    emptyFields.push('description')
  }
  if (!technology) {
    emptyFields.push('technology')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Merci de remplir tous les champs', emptyFields })
  }
  // add to the database
  try {
    const announcement = await Announcement.create({ title, description, technology, image: `${req.protocol}://${req.get('host')}/images/announcements/${req.file.filename}` })
    console.log(announcement)
    res.status(201).json(announcement)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a announcement
const deleteAnnouncement = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such announcement'})
  }

  const announcement = await Announcement.findOneAndDelete({_id: id})

  if(!announcement) {
    return res.status(400).json({error: 'No such announcement'})
  }

  res.status(200).json(announcement)
}

// update a announcement
const updateAnnouncement = async (req, res) => {
  const { id } = req.params

  const {title, description, technology} = req.body

  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }
  if (!description) {
    emptyFields.push('description')
  }
  if (!technology) {
    emptyFields.push('technology')
  }
  if(!req.file){
    emptyFields.push('image')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Merci de remplir tous les champs', emptyFields })
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such announcement'})
  }

  if(req.file){
    image = `${req.protocol}://${req.get('host')}/images/announcements/${req.file.filename}`;
    Announcement.findOne({_id: id},{image: true},(err, announcement)=>{
        if(err){
            console.log(err);
            return;
        }
        const filename = announcement.image.split('/announcements/')[1];
        fs.unlink(`public/images/announcements/${filename}`, (err)=>{
            if(err){
                console.log(err.message);
            }
            console.log(image)

        });
    })
  }
  const announcement = await Announcement.findOneAndUpdate({_id: id}, {
    ...req.body,
    image: image
  })
  if (!announcement) {
    return res.status(400).json({error: 'No such announcement'})
  }

  res.status(200).json(announcement)

}

module.exports = {
  getAnnouncements,
  getAnnouncement,
  createAnnouncement,
  deleteAnnouncement,
  updateAnnouncement
}