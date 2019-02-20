let mongoose = require('mongoose')
let Schema = mongoose.Schema

let citySchema = new Schema({
  cityname: {
    type: String,
    required: true
  },
  info:{
    type:String,
  },
  photoURL: {
    type:String,
    default: '/images/alimentos-vegetarianos.jpg'
  },
  likes: {
    type:String,
    default: '0'
  },
  address: {
    location: {
      type: String,
      default: 'Point',
    },
    coordinates: []
  },
  active: {
    type: Boolean,
    default: true,
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  slug: String,
}, {
  timestamps: true,
})


module.exports = mongoose.model('City', citySchema)
