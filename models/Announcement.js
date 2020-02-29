const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AnnouncementSchema = new Schema({
  owner: {
    type: String,
    required: true
  },
  team: {
    type: String,
    required: true
  },
  link: {
    type: mongoose.SchemaTypes.Url,
    required: false
  },
  title: {
    type: Date,
    required: true
  },
  description: {
    type: Date,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Photo = mongoose.model("photos", PhotoSchema);
