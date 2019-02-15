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

router.get('/places/new', (req,res,next) => {
  res.render('admin/places/new')
  })

router.get('/', (req,res,next) => {
res.render('admin/')
})

module.exports = router