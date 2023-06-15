const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  usernumber: {
    type: Number,
    required: true,
    unique: true
  },
  COMMENTS: {
    type: String,
    required: true,
  }
  
});

module.exports = mongoose.model("comment", commentSchema);