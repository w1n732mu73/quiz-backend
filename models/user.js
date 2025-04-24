const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userScheme = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true, minLength: 8 }
  },
  {
    timestamps: true
  }
)

userScheme.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
  } catch (error) {
    next(error);
  }
});

userScheme.methods.isValidPassword = async function(password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

module.exports = mongoose.model('User', userScheme, 'users')