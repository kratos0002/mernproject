const mongoose = require('mongoose')
const validator =  require('validator')

const jwt = require("jsonwebtoken")

const crypto = require("crypto")

const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Please Enter your name"],
        maxlength:[30, "Name cannot be more than 30 char"],
        minLength:[4,"Name should have more than 4 char"]
    },

    email:{
        type:String,
        required:[true, "Please enter your email"],
        unique:true,
        validate:[validator.isEmail, "Please enter valid email"]
    },

    password:{
        type:String,
        required:[true, "Please enter your password"],
        minlength:[8,"Password should be more than 8 char"],
        select: false
    },
    
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },

    role:{
        type:String,
        default:"user"
    },

    resetPasswordtoken:String,
    resetPasswordExpire:Date,

})

UserSchema.pre("save", async function(next){

    if(!this.isModified("password")){
        next()
    }

    this.password = await bcrypt.hash(this.password,10)
})

// JWT TOKEN

UserSchema.methods.getJWTToken = function () {
    return jwt.sign({id:this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE
    })

}

//compare passwords

UserSchema.methods.comparePassword = async function(enteredPassword){

    return await bcrypt.compare(enteredPassword, this.password)
}


// Generating Password reset token

UserSchema.methods.getResetPasswordToken = function() {
    //Generate token

    const resetToken = crypto.randomBytes(20).toString("hex")

    //Hashing and adding to userSchema

    
    this.resetPasswordtoken = crypto.createHash("sha256").update(resetToken).digest("hex")

    this.resetPasswordExpire = Date.now() + 15*60*1000

    return resetToken
}

module.exports = mongoose.model("User", UserSchema)