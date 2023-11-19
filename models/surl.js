const mongoose = require('mongoose');
const { Schema } = mongoose;


const shortURL = new Schema({
    origURL:{
        type: String,
        required: true
    },
    ShortUrl:{
        type: String
    }
  });
  const Notes= mongoose.model('url', shortURL); //use notes not user, to differ it from other models

  module.exports = Notes;