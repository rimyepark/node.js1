const mongoose = require("mongoose");

const guestbookSchema = new mongoose.Schema({
  usernumber: {
    type: Number,
    required: true,
    unique: true
  },
  comment: {
    type: String,
    required: true,
  }
  
});

module.exports = mongoose.model("comment", guestbookSchema);