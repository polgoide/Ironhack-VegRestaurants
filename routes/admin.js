let router = require('express').Router()
let User = require('../models/User')
let City = require('../models/City')
let Place = require('../models/Place')
let Comment = require('../models/Comment')
let passport = require('passport')
let { isRole, isAdmin, isLoggedIn, isAuth } = require('../helpers/middlewares')
let { sendWelcomeMail, sendNewsletter } = require('../helpers/mailer')
let multer = require('multer')
let upload = multer({ dest: './public/uploads' })
let uploadCloud = require('../helpers/cloudinary')

// Profile


// Send newsletters
// router.get('/newsletter', (req, res, next) => {
//   User.find()
//     .then(users => {
//       users.forEach(u => {
//         sendNewsletter(u.username, u.email)
//       })

//       res.send('Newsletter enviada')
//     })
//   .catch(e=> next(e))
// })

// COMMENTS

router.get('/comments/:id', (req, res, next) => {
  Comment.findById(req.params.id)
  // Promise.all([
  //   Comment.findById(req.params.id),
  //   Place.find({ _id: req.params.place }),
  //   User.find({ _id: req.params.authorId }),
  // ])
    .then(comment => {
      Promise.all([
        Place.find({ _id: comment.place }),
        User.find({ _id: comment.authorId }),
      ])
    
        .then(response => {
          console.log(comment)
          console.log(response)
          res.render('admin/comments/view', { comment, place: response[0], user: response[1] })
    }) 
  })
  .catch(e=> next(e))
})
  

// USERS

router.get('/users/:id', (req, res, next) => {
  Promise.all([
    User.findById(req.params.id),
    Comment.find({ authorId: req.params.id }),
  ])
    .then(response => {
    res.render('admin/user/view', {user: response[0], comments: response[1]})
  })
  .catch(e=> next(e))
  })

router.get('/users', (req, res, next) => {
  User.find()
    .then(users => {
      res.render('admin/user/', {users})
    })
    .catch(e=> next(e))
  })


// PLACES

// Edit place
router.get('/places/edit/:id', (req, res, next) => {
  Place.findById(req.params.id)
    .then(place => {
    console.log(place.pictures)
    res.render('admin/places/new', place)
  })
  .catch(e=> next(e))
  })

// New place
router.post('/places/new', isAdmin, uploadCloud.single('pictures'), (req, res, next) => {
  // req.body.pictures = req.file.url
  Place.create({...req.body, authorId: req.user._id })
  .then(()=>{
    res.redirect('/admin/places/')
  })
  .catch(e=> next(e))
  })

router.get('/places/new', (req, res, next) => {
  res.render('admin/places/new')
})
  
router.get('/places', (req, res, next) => {
  Place.find()
    .then(places => {
      res.render('admin/places/', {places})
    })
    .catch(e=> next(e))
  })

router.get('/', (req, res, next) => {
  Promise.all([
    Place.find().sort('-created_at').limit(10),
    User.find().sort('-created_at').limit(10),
    Comment.find().sort('-created_at').limit(10),
  ])
    .then(results => {
      res.render('admin/index', {places: results[0], users: results[1], comments: results[2]})
    })
  .catch(e=> next(e))
})

module.exports = router