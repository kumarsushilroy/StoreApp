
const crypto = require('crypto')

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }, 
    role:{
        type:String,
        enum:['admin', 'user']
    },
    photo:{
       type:String 
    },

    resetPasswordToken:String,
    resetPasswordExpire:Date
});


userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');

  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest('hex');
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 minutes
 console.log('RESETtoken===', resetToken)
  return resetToken;
};

module.exports = mongoose.model('user', userSchema)