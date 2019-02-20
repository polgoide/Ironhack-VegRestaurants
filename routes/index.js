const express = require('express');
const router = express.Router();
const Place = require('../models/Place')
const Comment = require('../models/Comment.js')
const City = require('../models/City')
const uploadCloud = require('../helpers/cloudinary')
let { isRole, isAdmin, isLoggedIn, isAuth } = require('../helpers/middlewares')


// Search

router.post('/search', (req, res, next) => {
  const { query } = req.body
  Promise.all([
    City.find({cityname: {$regex: query, $options: 'i'}}),
    Place.find({$or:[ {name: {$regex: query, $options: 'i'}}, {type: {$regex: query, $options: 'i'}}, {description: {$regex: query, $options: 'i'}}, {foodType: {$regex: query, $options: 'i'}}]})
  ])
    .then(result => {
      console.log(result)
      res.render('search', {cities: result[0], places: result[1] })
    })
  .catch(err=> next (e))
})

// Cities

router.get('/ciudades', (req,res,next)=> {
  City.find()
    .then(cities => {
    req.app.locals.title = "Ciudades con restaurantes veganos"
    res.render('cities/cities', {cities})
  }).catch(err=> next (e))
})


router.get('/ciudad/:id', (req, res, next) => {
  const { id } = req.params
  Promise.all([
    City.findById(id),
    Place.find({cityId: id})
  ])
    .then(response => {
    req.app.locals.title = `Comida vegana en ${response[0].cityname}`
    res.render('cities/detail', {city: response[0], places: response[1]})
  }).catch(e=> console.log(e))
})


// Place: add comment
router.post('/:slug/:id', isAuth, uploadCloud.single('pictures'), (req, res, next) => {
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
    Place.findById(id).populate('cityId'),
    Comment.find({ place: id }).limit(10).populate('authorId')
  ])
    .then(results => {
      req.app.locals.title = `${results[0].name} comida vegana`
      res.render('places/detail', {place: results[0], comments: results[1]})
    })
  .catch(e=> next(e))
  
})

// T&C
router.get('/terminos', (req, res, next) => {
  req.app.locals.title = `Terminos y condiciones`
  res.render('terminos');
})
router.get('/privacidad', (req, res, next) => {
  req.app.locals.title = `Politicas de privacidad`
      res.render('privacy');
})

/* GET home page */
router.get('/', (req, res, next) => {
  Promise.all([
    Place.find({ active: true }).limit(6),
    City.find({ active: true }).limit(8),
  ])
    .then(results => {
      req.app.locals.title = `Comer vegano: los mejores restaurantes`
      res.render('index', { places: results[0], cities: results[1] });
    })
    .catch(e => console.log(e))
  
})

module.exports = router;
