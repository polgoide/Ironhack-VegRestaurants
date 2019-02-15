let mongoose = require('mongoose')
let Schema = mongoose.Schema

let placeSchema = new Schema({
  name: String,
  address: String,
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
}, { timestamps: true })

module.exports= mongoose.model('Place', placeSchema)