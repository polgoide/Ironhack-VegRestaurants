const express = require('express');
const router = express.Router();
const Place = require('../models/Place')
const Comment = require('../models/Comment.js')
const uploadCloud = require('../helpers/cloudinary')

// Place: add comment
router.post('/comer/:id',  uploadCloud.single('pictures'), (req, res, next) => {
  req.body.pictures = req.file.url
  const { id } = req.params
  Comment.create({...req.body, place: req.params.id, authorId:  req.user._id, $push: {pictures: req.file.url}})
    .then(() => console.log(req.body)) // res.redirect('/comer/' + id + '/#opiniones')
    .catch(e=> next(e))
})

// Place detail
router.get('/comer/:id', (req, res, next) => {
  const { id } = req.params
  Promise.all([
    Place.findById(id),
    Comment.find({ place: id }).limit(10).populate('authorId')
  ])
    .then(results => {
      res.render('places/detail', {place: results[0], comments: results[1]})
    })
  .catch(e=> next(e))
  
})

/* GET home page */
router.get('/', (req, res, next) => {
  Place.find({active: true})
    .then(places => {
      res.render('index', {places});
    })
  .catch(e=> next(e))
  
})

module.exports = router;
