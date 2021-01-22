const mongoose = require ('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxlength: [30, 'Your name cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        minlength: [6, 'Your password must be longer than 6 characters'],
        select: false
    },
    contactNumber: {
        type: String,
        required: [true, 'Please enter your contact number'],
        maxlength: [13, 'Your number cannot exceed 13 characters']
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
            default: 'avatars/default_avatar_jstgei'
        },
        url: {
            type:String,
            required:true,
            default: 'https://res.cloudinary.com/agiletech3itf/image/upload/v1611216969/avatars/default_avatar_jstgei.png'
        }
    },
    role: {
        type: String,
        default: 'admin'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date

})

// Encrypting password before saving user

userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// Compare user password

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

// Return JWT token 

userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

// Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
    // Generate token
     const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    // Set token expired time (30 mins)
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

    return resetToken

}

module.exports = mongoose.model('User', userSchema);