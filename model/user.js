const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: false },
  tellNum: { type: String, required: true, unique: true },
  address: { type: String, required: true, unique: false },
  createDate: {
    type: Date,
    default: Date.now,
  },
  updateDate: {
    type: Date,
    default: Date.now,
  },
});

userSchema.statics.create = function(payload) {
  const user = new this(payload);
  user.save().then(data => {
    data.updatePassword(payload.password);
    console.log(data.password);
    return data;
  });
};

userSchema.statics.findAll = function() {
  return this.find({});
};

userSchema.statics.findByUsername = function(username) {
  return this.findOne({ username });
};

userSchema.statics.update = function(id, payload) {
  const { _id, username, createDate, updateDate, ...updateField } = payload;
  return this.findByIdAndUpdate(id, updateField, { new: true }).exec();
};

userSchema.statics.delete = function(id) {
  return this.findByIdAndRemove(id);
};

userSchema.methods.updatePassword = function(password) {
  this.password = bcrypt.hash(password, 10);
};

userSchema.methods.isEqualPassword = function(password) {
  return bcrypt.compare(this.password, password);
};

module.exports = mongoose.model('User', userSchema);
