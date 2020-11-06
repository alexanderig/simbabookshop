const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  city: {
    ref: 'cities',
    type: Schema.Types.ObjectId,
   
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('users', userSchema)