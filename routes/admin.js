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

//CITIES

router.post('/cities/edit/:id', (req, res, next) => {
  City.findById(req.params.id)
    .then(city => {
    res.redirect('/admin/cities/')
  })
  .catch(e=> next(e))
})
  
router.get('/cities/edit/:id', (req, res, next) => {
  City.findById(req.params.id)
    .then(city => {
      const config = {
        action: `/admin/cities/edit/${req.params.id}`,
        submit: 'Update',
      }
      console.log({city, config})
    res.render('admin/cities/new', {city, config})
  })
  .catch(e=> next(e))
  })

router.post('/cities/new', isAdmin, uploadCloud.single('photoURL'), (req, res, next) => {
  req.body.photoURL = req.file.url
  City.create({...req.body, authorId: req.user._id })
  .then(()=>{
    res.redirect('/admin/cities/')
  })
  .catch(e=> next(e))
})
  

router.get('/cities/new', (req, res, next) => {
  const config = {
    action: `/admin/cities/new`,
    submit: 'Create',
  }
res.render('admin/cities/new', config)
})

router.get('/cities', (req, res, next) => {
  City.find()
    .then(cities => {
      res.render('admin/cities/', {cities})
    })
    .catch(e=> next(e))
  })

// COMMENTS

router.post('/comments/:id', (req, res, next) => {
  Comment.findByIdAndUpdate(req.params.id, {active: req.body.active})
    .then(comment => {
      res.render('admin/comments/view', comment)
  })
  .catch(e=> next(e))
})
  

router.get('/comments/:id', (req, res, next) => {
  Comment.findById(req.params.id).populate('place').populate('authorId')
    .then(comment => {
      res.render('admin/comments/view', comment)
  })
  .catch(e=> next(e))
})

router.get('/comments', (req, res, next) => {
  Comment.find()
    .then(comments => {
      res.render('admin/comments/', {comments})
    })
    .catch(e=> next(e))
  })
  

// USERS
router.post('/users/:id', (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
    res.redirect('/admin/users/')
  })
  .catch(e=> next(e))
})

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
router.post('/places/edit/:id', (req, res, next) => {
  Place.findByIdAndUpdate(req.params.id,  {$push :{pictures: req.body.pictures}})
    .then(() => {
    res.redirect('admin/places/')
  })
  .catch(e=> next(e))
})

router.get('/places/edit/:id', (req, res, next) => {
  Place.findById(req.params.id)
    .then(place => {
    console.log(place.pictures)
    res.render('admin/places/edit', place)
  })
  .catch(e=> next(e))
})

// New place
router.post('/places/new', isAdmin, uploadCloud.single('pictures'), (req, res, next) => {
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
    Place.find().sort('-createdAt').limit(10),
    User.find().sort('-createdAt').limit(10),
    Comment.find().sort('-createdAt').limit(10),
    City.find().sort('-createdAt').limit(10),
  ])
    .then(results => {
      res.render('admin/index', {places: results[0], users: results[1], comments: results[2], cities: results[3]})
    })
  .catch(e=> next(e))
})

module.exports = router