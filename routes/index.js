const express = require('express');
const router = express.Router();
const Place = require('../models/Place')
const Comment = require('../models/Comment.js')
const uploadCloud = require('../helpers/cloudinary')

// Place: add comment
router.post('/comer/:id',
//islogged
  uploadCloud.single('pictures'), (req, res, next) => {
    if (req.file) req.body.pictures = [req.file.url]
    console.log(req.body)
  req.body.authorId = req.user._id
    req.body.place = req.params.id
  Comment.create(req.body)
    .then(comment => res.redirect('/comer/' + req.params.id + '/#opiniones'))
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

router.get('/terminos', (req, res, next) => {
  res.render('terminos');
})
router.get('/privacidad', (req, res, next) => {
      res.render('privacy');
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
