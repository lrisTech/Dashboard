const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AnnouncementSchema = new Schema({
  owner: {
    type: Object,
    required: true
  },
  team: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Announcement = mongoose.model("announcements", AnnouncementSchema);
