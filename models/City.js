let mongoose = require('mongoose')
let Schema = mongoose.Schema

let citySchema = new Schema({
  cityname: {
    type: String,
    required: true
  },
  photoURL: {
    type:String,
    default: '/images/alimentos-vegetarianos.jpg'
  },
  info:{
    type:String,
  },address: {
    location: {
      type: String,
      default: 'Point',
    },
    coordinates: []
  }
}, {
  timestamps: true,
})




module.exports = mongoose.model('City', citySchema)
