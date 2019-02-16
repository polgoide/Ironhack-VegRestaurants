let router = require('express').Router()
let User = require('../models/User')
let City = require('../models/City')
let Place = require('../models/Place')
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

// USERS

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
    console.log(place)
    res.render('admin/places/new', place)
  })
  .catch(e=> next(e))
  })

// New place
router.post('/places/new', isAdmin, uploadCloud.single('pics'), (req, res, next) => {
  //req.body.pics = req.file.url
  Place.create({...req.body, authorId: req.user._id})
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

router.get('/', (req,res,next) => {
res.render('admin/')
})

module.exports = router