let router = require('express').Router()
let User = require('../models/User')
let Comment = require('../models/Comment')
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

router.get('/profile', isLoggedIn, (req, res) => {
  Promise.all([
    User.findById(req.user._id),
    Comment.find({authorId: req.user._id}).populate('place')
  ])
    .then(r => {
      console.log(r[1])
      res.render('auth/profile', {user: r[0], comments: r[1]})
  })
})

// Logout
router.get('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

// FB login
router.get('/auth/callback/facebook', passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res, next) => {
    res.redirect('/')
  })
router.get('/facebook/login', passport.authenticate('facebook', { scope: ['email'] }), (req, res, next) => {
  req.app.locals.fbLogin  = req.query.next
}) // Scope to get additional fields

// Local login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    console.log('error  1', err)
    if (err) return next(err)
    if (!user) return res.render('auth/login', { ...req.body, error: "Email o contrasena incorrecta" })
    req.logIn(user, err => {
      console.log('error 2', err)
      if (err) return res.render('auth/login', { ...req.body, error: "Contrasena incorrecta" })
      if (req.query.next) return res.redirect(req.query.next)
      else return res.redirect('/')
    })
  })(req, res, next)  
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
  User.findOne({ email: req.body.email })
    .then(r => {
      if(r) return res.render('auth/signup', {...req.body, errors:{email: "Ya existe un usuario con ese email."}})
      User.register(req.body, req.body.password)
      .then(user => {
        sendWelcomeMail(user.username, user.email)
        res.redirect('/login')
      })
      .catch(e=> next(e))
    }) 
})

router.get('/signup', (req,res,next) => {
res.render('auth/signup')
})

module.exports = router