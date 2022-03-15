const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")

const User = require('../models/userModels')

const crypto = require("crypto")


const sendEmail = require('../utils/sendEmail.js')

const sendToken = require('../utils/jwtToken')

//Register a user

exports.registerUser = catchAsyncErrors(async(req, res, next)=>{
    const {name, email, password} = req.body
    const user = await User.create({
        name, email, password, 
        avatar:{
            public_id:"this is a sample id",
            url:"profilepicurl"
        }
    })
    sendToken(user, 201, res)
})

exports.loginUser = catchAsyncErrors(async(req, res, next)=>{

    const{email, password} = req.body


    //check if both email and pass is given

    if(!email || !password){
        return next(new ErrorHandler("Please enter email and pass", 400))
    }

    const user = await User.findOne({email}).select("+password")

    if(!user){
        return next(new ErrorHandler("invalid email or pass", 401))
    }

    const isPasswordMatched = await user.comparePassword(password)

    console.log(isPasswordMatched)

    if(!isPasswordMatched){
        return next(new ErrorHandler("invalid email or pass", 401))
    }

    sendToken(user, 200, res)

})


//Logout User

exports.logout = catchAsyncErrors(async(req, res, next)=>{

    res.cookie("token", null,{
        expires: new Date(Date.now()),
        httpOnly:true
    })


    res.status(200).json({
        success: true,
        message: "Logged out"
    })
})

// Forgot Password 

exports.forgotPassword = catchAsyncErrors(async(req, res, next)=>{
    const user = await User.findOne({email: req.body.email})

    if(!user){
        return next(new ErrorHandler("User not found"), 404)
    }

    //Get reset password token

    const resetToken = user.getResetPasswordToken()

    await user.save({validateBeforeSave: false})

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n if you have not requested, then ignore` 

    try{

        await sendEmail({
            email: user.email,
            subject: `Nileos Password Recovery`,
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        })

    }catch(error){
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save({validateBeforeSave: false})

        return next(new ErrorHandler(error.message, 500))
    }
})

//Reset Password

exports.resetPassword = catchAsyncErrors(async(req, res, next)=>{

    //creating token hash
    const resetPasswordtoken = crypto.createHash("sha256").update(req.params.token).digest("hex")

    const user = await User.findOne({
        resetPasswordtoken,
        resetPasswordExpire: {$gt: Date.now()}
    })

    if(!user){
        return next(new ErrorHandler("Reset password token is invalid or has expired"), 400)
    }

    if(req.body.password !==  req.body.confirmPassword){

        return next(new ErrorHandler("Password doesnt match"), 400)

    } 

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    sendToken(user, 200, res)

})

//Get user details

exports.getUserDetails = catchAsyncErrors(async(req, res, next)=>{

    const user = await User.findById(req.user.id)

    res.status(200).json({
        success:true,
        user

    })


})