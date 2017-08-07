const mongoose = require('mongoose');

const gifSchema = new mongoose.Schema({
  userId: { type: "ObjectId", required: true },
  url: { type: String, required: true }
},
{
  timestamps: true
})

const Gif = mongoose.model('Gif', gifSchema)
module.exports = Gif
