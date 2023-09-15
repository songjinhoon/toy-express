const jwt = require('jsonwebtoken');
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

userSchema.statics.create = function (payload) {
  const user = new this({
    ...payload,
    password: bcrypt.hashSync(payload.password, 10),
  });
  return user.save();
};

userSchema.statics.findAll = function () {
  return this.find({});
};

userSchema.statics.findByUsername = function (username) {
  return this.findOne({ username });
};

userSchema.statics.update = function (id, payload) {
  const { _id, username, createDate, updateDate, ...updateField } = payload;
  return this.findByIdAndUpdate(id, updateField, { new: true }).exec();
};

userSchema.statics.delete = function (id) {
  return this.findByIdAndRemove(id);
};

userSchema.methods.isEqualPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      _id: this.id,
      username: this.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: '10m' },
    // { expiresIn: '1d' },
  );
  return token;
};

module.exports = mongoose.model('User', userSchema);
