let mongoose = require('mongoose')
let Schema = mongoose.Schema
// Passport  plugin to replace the String password
let passportLocalMongoose = require('passport-local-mongoose')

let userSchema = new Schema({
username: {
  type: String,
  required: true
},
  email: String,
  facebookId: String,
  photoURL: String,
  role: {
    type: String,
    enum: ['Admin', 'Editor', 'Guest'],
    default: 'Guest',
  }
// password: String
}, {timestamps:true})

userSchema.plugin(passportLocalMongoose, {
  usernameField: "email"})

module.exports = mongoose.model('User', userSchema)