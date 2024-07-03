const catchAsyncError = require("../middlewares/catchAsyncError");
const User = require("../models/userModel");
const sendEmail = require("../utils/email");
const errorHandler = require("../utils/errorHandler");
const sendToken = require('../utils/jwt')
const crypto = require('crypto')
const Employee = require('../models/employeeModel')

//To register user
exports.registerUser = catchAsyncError(async (req, res) => {
    const { name, email, phoneNumber, address, password, postalCode, city, country } = req.body

    let BASE_URL = process.env.STATIC_URL
    if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}/`
    }
    
     const avatar = req.file ? `${BASE_URL}uploads/user/${req.file.originalname}` : null;
    const user = await User.create({
        name, email, phoneNumber, address, password, avatar, postalCode, city, country
    })
    sendToken(user, 201, res)
})

//To Login user = /api/login
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(new errorHandler('Please enter email & password', 400))
    }

    //finding the user data from Database 
    //*password field is not here bcoz we have hide password in userModel that's why we select  +password
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
        return next(new errorHandler('Invalid email or password', 401))
    }

    if (! await user.isValidPassword(password)) {
        return next(new errorHandler('Invalid email or password', 401))
    }

    await sendToken(user, 201, res)
})


//To logout User = /api/logout
exports.logoutUser = (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
        .status(200)
        .json({
            success: true,
            message: "Logged Out"
        })
}


//Forgot password by entering ur email in body = /api/password/forgot
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    //get user by email
    const user = await User.findOne({ email: req.body.email })

    //If email is not in DB
    if (!user) {
        return next(new errorHandler('User not found with this email', 404))
    }

    //If email is correct then generate reset token
    const resetToken = user.getResetToken()
    await user.save({ validateBeforeSave: false })

    let BASE_URL =`http://localhost:${process.env.PORT}/`
    if(process.env.NODE_ENV === "production"){
        BASE_URL = process.env.FRONTEND_URL
    }

    //Create reset URL
    const resetUrl = `${BASE_URL}/password/reset/${resetToken}`

    //Create email message
    const message = `Your password reset url is as follows \n\n
                     ${resetUrl}  \n\n If you have not requested this email, then ignore it.`

    //sending email to reset password
    try {

        sendEmail({
            email: user.email,
            subject: "Sales and Service Password Recovery",
            message
        })
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordTokenExpire = undefined
        await user.save({ validateBeforeSave: false })
        return next(new errorHandler(error.message), 500)
    }
})


//reset password by passing password and confirmPassword in body = api/password/reset/:token
exports.resetPassword = catchAsyncError(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    //get user data by user resetPasswordToken
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordTokenExpire: {
            $gt: Date.now()
        }
    })

    if (!user) {
        return next(new errorHandler('Password reset token is invalid or expired', 404))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new errorHandler('Password does not match', 404))
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordTokenExpire = undefined
    await user.save({ validateBeforeSave: false })

    sendToken(user, 201, res)
})


//Get User Profile - api/myprofile
exports.getUserProfile = catchAsyncError(async (req, res, next) => {

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return next(new errorHandler("User not found", 404));
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        return next(new errorHandler("Server error", 500));
    }
});


//Update User Profile - api/update
exports.updateProfile = catchAsyncError(async (req, res, next) => {
    let newUserData = {
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        postalCode: req.body.postalCode,
        city: req.body.city,
        country: req.body.country
    };

    // Check if req.file exists to update avatar
    if (req.file) {
        let BASE_URL = process.env.STATIC_URL || '';
        if (process.env.NODE_ENV === "production") {
            BASE_URL = `${req.protocol}://${req.get('host')}/`;
        }
        const avatarUrl = `${BASE_URL}uploads/user/${req.file.filename}`;
        newUserData.avatar = avatarUrl; // Update avatar in newUserData
    }

    // Update user in the database
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true, // Return the updated user object
        runValidators: true // Run validators on update
    });

    await user.save()

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }

    res.status(200).json({
        success: true,
        user
    });
});


//Admin : Get All users = 
exports.getAllUsersByAdmin = catchAsyncError(async (req, res, next) => {
    const user = await User.find()
    res.status(200).json({
        success: true,
        user
    })
})

//Admin : Get specific users = 
exports.getSpecificUserByAdmin = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return next(new errorHandler(`User not found with this id ${req.params.id}`, 404))
    }
    res.status(200).json({
        success: true,
        user
    })
})

// //Admin : update user or role/name
// exports.updateUserByAdmin = catchAsyncError(async (req, res, next) => {
//     const newUserData = {
//         name: req.body.name,
//         role: req.body.role,
//     }

//     const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
//         new: true,
//         runValidators: true
//     })

//     if (req.body.role === "employee") {
//         if (!req.body.type) {
//             return next(new errorHandler(`Please select/enter employee type sales or service`, 401))
//         }
//         const emp = await User.findById(req.params.id)
//         const newEmployee = await Employee.create({
//             name: emp.name,
//             email: emp.email,
//             avatar: emp.avatar,
//             employeeType: req.body.type
//         })
//         await newEmployee.save({ validateBeforeSave: false })
//     }

//     res.status(200).json({
//         success: true,
//         user
//     })
// })


//Admin : Delete user
const mongoose = require('mongoose');

// Deleting User by Admin = api/admin/user/:id
exports.deleteUserByAdmin = catchAsyncError(async (req, res, next) => {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return next(new errorHandler(`Invalid user ID: ${userId}`, 400));
    }
    const user = await User.findById(userId);
    if (!user) {
        return next(new errorHandler(`User not found with this ID: ${userId}`, 404));
    }
    // Delete the user
    await User.deleteOne({ _id: userId });
    // If the user is an employee, delete the corresponding employee record
    if (user.role === "employee") {
        await Employee.deleteOne({ email: user.email });
    }
    res.status(200).json({
        success: true,
        message: `User with ID ${userId} and associated records have been deleted`
    });
});
