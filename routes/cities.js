const router = require ('express').Router()
const City = require ('../models/City')


router.get('/', (req,res,next)=> res.render('index'))

router.get('/cities', (req,res,next)=> {
  City.find()
  .then (cities =>{
    res.render('cities', {cities})
  }).catch(err=> next (e))
})


router.get('/cities/detail/:id', (req,res,next) =>{
  const {id} = req.params
  City.findById(id)
  .then(city=>{
    res.render('detail', city)
  }).catch(err=>{
    res.render('error', err)})
})

module.exports = router
