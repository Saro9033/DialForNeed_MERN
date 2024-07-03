const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name']
    },
    email: {
        type: String,
        required: [true, 'Please enter Email Id'],
        unique: [true, 'Duplicate Key error'],
        trim: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Please enter Email Id'],
        select:false
    },
    country: {
        type: String,
    },
    city: {
        type: String,
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please enter Phone Number'],
    },
    postalCode: {
        type: String,

    },
    address:{
        type:String,

    },
    avatar:{
        type:String,
    },
    role:{
        type:String,
        default:'user'
    },
    resetPasswordToken:String,
    resetPasswordTokenExpire:Date,
    createdAt:{
        type:Date,
        default:Date.now
    }
})

//middleware function to hiding(hashing) passoword
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

//To generate JWT token
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this.id}, process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRES_TIME}
    )
}

//To validate password
userSchema.methods.isValidPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

//To resetPassword
userSchema.methods.getResetToken =  function(){
    //generate token
    const token = crypto.randomBytes(20).toString('hex');

    //generate hash and set resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex')

    //set token expire time
    this.resetPasswordTokenExpire = Date.now() + 30* 60 * 1000;
    return token
}

module.exports = mongoose.model('User', userSchema)