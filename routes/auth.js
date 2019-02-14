let router = require('express').Router()
let User = require('../models/User')
let bcrypt = require('bcrypt')
let passport = require('passport')
let { isRole, isAdmin, isLoggedIn, isAuth } = require('../helpers/middlewares')
let { sendWelcomeMail, sendNewsletter } = require('../helpers/mailer')
let multer = require('multer')
let upload = multer({ dest: './public/uploads' })
let uploadCloud = require('../helpers/cloudinary')

// Private page, only for admins
router.get('/private', isLoggedIn, isRole('Admin'), (req, res, next) => {
  res.render('auth/private', {admin: true})
})

// Profile
router.post('/profile', isLoggedIn, uploadCloud.single('photoURL'), (req, res) => {
  //if(req.file) req.body.photoURL = "/uploads/" + req.file.filename  /
  req.body.photoURL = req.files.photoURL[0].url
  User.findByIdAndUpdate(req.user._id, req.body)
  .then(()=>{
    res.redirect('/profile')
  })
})

router.get('/profile', isLoggedIn, (req,res) => {
  res.render('auth/profile', req.user)
})

// Send newsletters
router.get('/newsletter', (req, res, next) => {
  User.find()
    .then(users => {
      users.forEach(u => {
        sendNewsletter(u.username, u.email)
      })

      res.send('Newsletter enviada')
    })
  .catch(e=> next(e))
})

// Logout
router.get('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

// FB login
router.get('/auth/callback/facebook', passport.authenticate('facebook'),
  (req, res) => {
    if (req.query.next) res.redirect(req.query.next)
    else res.redirect('/')
})
router.get('/facebook/login',  passport.authenticate('facebook', {scope: ['email']})) // Scope to get additional fields

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  if (req.query.next) return res.redirect(req.query.next) // If there was a next, redirect the user there.
  else res.redirect('/')  // Otherwise, redirect him to home page

  
  // let {email,password} = req.body
  // User.findOne({email})
  // .then(user => {
  //   if(!user) return res.render('auth/login', {error: "Tu usuario no existe"})
  //   if(bcrypt.compareSync(password,user.password)) {  // looking for the hashed pw
  //     req.session.currentUser = user // Storing the session
  //     res.redirect('/')
  //     return
  //   }  
  // })
  // .catch(e=> next(e))
})


router.get('/login', isAuth, (req, res, next) => {
  let ctx = {}
  if (req.query.next) ctx.next = req.query.next // We save the next query to pass it onto the post
  res.render('auth/login', ctx)
})


  // Signup
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

// Encriptar el password
// let salt = bcrypt.genSaltSync(10)
// let hash = bcrypt.hashSync(req.body.password,salt) // the hashed pw
// req.body.password = hash // replacing the plain pw with the hashed one
//  User.create(req.body) 
//  .then(() => res.redirect('/login'))
//  .catch(e=> next(e))
})

router.get('/signup', (req,res,next) => {
res.render('auth/signup')
})

module.exports = router