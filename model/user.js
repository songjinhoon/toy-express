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

userSchema.statics.create = function (payload) {
  const user = new this(payload);
  return user.save();
};

userSchema.statics.findAll = function () {
  return this.find({});
};

userSchema.statics.update = function (id, payload) {
  const { _id, username, createDate, updateDate, ...updateField } = payload;
  return this.findByIdAndUpdate(id, updateField, { new: true }).exec();
};

userSchema.statics.delete = function (id) {
  return this.findByIdAndRemove(id);
};

module.exports = mongoose.model('User', userSchema);
