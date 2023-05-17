const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    minlength: [2, "name must be at least 2 characters long"]
  }
}, {timestamps:true});

const Author = mongoose.model('Author', AuthorSchema);

module.exports = Author;
