let mongoose = require('mongoose')
let Schema = mongoose.Schema

let citySchema = new Schema({
  cityname: {
    type: String,
    required: true
  },
  photoURL: {
    type:String,
    default: 'https://www.worldatlas.com/r/w727-h434-c727x434/upload/4f/df/5e/shutterstock-501836233.jpg'
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
