const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PhotoSchema = new Schema({
  op: {
    type: String,
    required: true
  },
  img: { 
    data: Buffer, 
    contentType: String 
  },
  featured: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Photo = mongoose.model("photos", PhotoSchema);
