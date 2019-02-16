let mongoose = require('mongoose')
let Schema = mongoose.Schema

let placeSchema = new Schema({
  name: String,
  description: String,
  address: {
    location: {
      type: String,
      default: "Point"
    },
    coordinates: []
  },
  phoneNumber: String,
  type: {
    type: String,
    enum: ['Vegan', 'Vegetarian']
  },
  foodType: String,
  pictures: [String],
  rating: String,
  priceRange: String,
  openTimes: String,
  cityId: {
    type: Schema.Types.ObjectId,
    ref: "City"
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  social: [{
    likes: String,
    dislikes: String,
    twitter: String,
    instagram: String,
    facebook: String,
  }],
  pics: [String],
  foursquareId:  {
    type: String,
    unique: true,
  },
  slug: String,
  active: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true })

module.exports= mongoose.model('Place', placeSchema)