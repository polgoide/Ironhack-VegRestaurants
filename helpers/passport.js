let User = require('../models/User')
let passport = require('passport')
let FacebookStrategy = require('passport-facebook')

//Facebook Strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "https://comervegano.com/auth/callback/facebook", // to change for dotenv
  profileFields: ["email", "picture", "displayName"]
},
  function (accessToken, refreshToken, profile, cb) {
  console.log(profile._json)
  User.findOne({$or: [{ facebookId: profile._json.id },  { email: profile._json.email }]})
    .then(user => {
      if (!user) { //If the user doesn't exist, let's create it
        let u = {
          name: profile._json.name,
          email: profile._json.email,
          photoURL: profile.photos[0].value,
          facebookId: profile.id
        }
        return User.create(u)
      }
      cb(null,user)
    })
    .then(newUser => { // Success promise for creating a new user. 
      cb(null,newUser)
    })
  .catch(e=> cb(e)) //  Sharing the error with passport using "cb"
}
));

// Local Strategy
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

module.exports = passport