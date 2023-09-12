const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
  tellNum: String,
  address: String,
  createDate: {
    type: Date,
    default: Date.now,
  },
  updateDate: {
    type: Date,
    default: Date.now,
  },
});

userSchema.statics.findAll = function () {
  return this.find({});
};

userSchema.statics.create = function (payload) {
  const user = new this(payload);
  return user.save();
};

module.exports = mongoose.model('User', userSchema);
