const express = require('express');
const router = express.Router();
const Place = require('../models/Place')
const Comment = require('../models/Comment.js')
const City = require('../models/City')
const uploadCloud = require('../helpers/cloudinary')

// Cities

router.get('/cities', (req,res,next)=> {
  City.find()
  .then (cities =>{
    res.render('cities', {cities})
  }).catch(err=> next (e))
})


router.get('/ciudad/:id', (req,res,next) =>{
  const {id} = req.params
  City.findById(id)
  .then(city=>{
    res.render('detail', city)
  }).catch(err=>{
    res.render('error', err)})
})


// Place: add comment
router.post('/:slug/:id',
//islogged
  uploadCloud.single('pictures'), (req, res, next) => {
    if (req.file) req.body.pictures = [req.file.url]
    req.body.authorId = req.user._id
    req.body.place = req.params.id
    console.log('q', req.body)
  Comment.create(req.body)
    .then(comment => res.redirect(`/${req.params.slug}/${req.params.id}/#opiniones`))
    .catch(e=> next(e))
})

// Place detail
router.get('/:slug/:id', (req, res, next) => {
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

// T&C
router.get('/terminos', (req, res, next) => {
  res.render('terminos');
})
router.get('/privacidad', (req, res, next) => {
      res.render('privacy');
})

/* GET home page */
router.get('/', (req, res, next) => {
  Promise.all([
    Place.find({ active: true }),
    City.find({ active: true }),
  ])
    .then(results => {
      res.render('index', { places: results[0], cities: results[1] });
    })
    .catch(e => console.log(e))
  
})

module.exports = router;
