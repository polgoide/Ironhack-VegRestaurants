let mongoose = require('mongoose')
let Schema = mongoose.Schema
let passportLocalMongoose = require('passport-local-mongoose')

let userSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  facebookId: String,
  photoURL: String,
  role: {
    type: String,
    enum: ['Admin', 'Guest'],
    default: 'Guest',
  },
  active: {
    type: Boolean,
    default: true,
  }
}, {timestamps:true})

userSchema.plugin(passportLocalMongoose, {
  usernameField: "email"})

module.exports = mongoose.model('User', userSchema)