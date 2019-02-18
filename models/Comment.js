let mongoose = require('mongoose')
let Schema = mongoose.Schema

let commentSchema = new Schema({
    place: {
      type: Schema.Types.ObjectId,
      ref: "Place"
    },
    body: String,
    pictures: [String],
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
},{timestamps:true})

module.exports = mongoose.model('Comment',commentSchema)