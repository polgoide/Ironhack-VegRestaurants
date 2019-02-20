let router = require('express').Router()
let User = require('../models/User')
let passport = require('passport')
let { isRole, isAdmin, isLoggedIn, isAuth } = require('../helpers/middlewares')
let { sendWelcomeMail, sendNewsletter } = require('../helpers/mailer')
let multer = require('multer')
let upload = multer({ dest: './public/uploads' })
let uploadCloud = require('../helpers/cloudinary')

// let instance = M.Carousel.init({
//   fullWidth: true
// })

// Profile
router.post('/profile', isLoggedIn, uploadCloud.single('photoURL'), (req, res) => {
  req.body.photoURL = req.files.photoURL[0].url
  User.findByIdAndUpdate(req.user._id, req.body)
  .then(()=>{
    res.redirect('/profile')
  })
})

router.get('/profile', isLoggedIn, (req,res) => {
  res.render('auth/profile', req.user)
})

// Logout
router.get('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

// FB login
router.get('/auth/callback/facebook', passport.authenticate('facebook', { failureRedirect: '/login' }),
(req, res, next) => res.redirect('/cities'))
router.get('/facebook/login', passport.authenticate('facebook', { scope: ['email'] }), (req, res, next) => {
  req.app.locals.fbLogin  = req.path
}) // Scope to get additional fields

// Local login
router.post('/login', passport.authenticate('local'), (req, res, next) => {
  if (req.query.next) return res.redirect(req.query.next) // If there was a next, redirect the user there.
  else res.redirect('/')  // Otherwise, redirect him to home page
})

router.get('/login', isAuth, (req, res, next) => {
  let ctx = {}
  if (req.query.next) ctx.next = req.query.next // We save the next query to pass it onto the post
  res.render('auth/login', ctx)
})

  // Local signup
router.post('/signup', (req,res,next) => {
  if(req.body.password !== req.body.password2) {
    res.render('auth/signup', {...req.body, errors:{password: "Los passwords no coinciden"}})
    return
  }
  User.register(req.body, req.body.password)
    .then(user => {
      sendWelcomeMail(user.username, user.email)
      res.redirect('/login')
    })
    .catch(e=> next(e))
})

router.get('/signup', (req,res,next) => {
res.render('auth/signup')
})

module.exports = router