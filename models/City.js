let mongoose = require('mongoose')
let Schema = mongoose.Schema

let citySchema = new Schema({
  
}, { timestamps: true })

module.exports= mongoose.model('City', citySchema)