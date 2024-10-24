const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    fullName: String,
    admissionNumber: String,
    mobileNumber: String,
    personalEmail: String,
    instituteEmail: String,
    branch: String,
    linkedInProfile: String,
    githubProfile: String,
    leetcodeProfile: String,
    codeforcesProfile: String,
    password: String,
    emailVerified: { type: Boolean, default: false },  // New field
    verificationToken: String,  // Token for email verification
    resetPasswordToken: String,  // Token for password reset
    resetPasswordExpires: Date,  // Token
});



  userSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
      try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
      } catch (err) {
        next(err);
      }
    } else {
      return next();
    }
  });
  
  // Method to compare password for login
  userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };
  
module.exports = mongoose.model('user', userSchema);