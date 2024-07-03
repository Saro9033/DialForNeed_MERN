const catchAsyncError = require("../middlewares/catchAsyncError");
const Razorpay = require('razorpay')

const razorpay = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET
});

exports.processPayment = catchAsyncError(async (req, res, next) => {
    const { amount } = req.body;
    
    try {
        const order = await razorpay.orders.create({
            amount: amount * 100, // Amount in paise (100 paise = 1 INR)
            currency: "INR",
            receipt: "receipt#1"
        });

        res.json({
            success: true,
            order,
            clientSecret:order.id,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
});

exports.sendApiKey = catchAsyncError(async (req, res, next) => { 
    res.json({
        key: process.env.KEY_ID // Send the Razorpay Key ID to the client as well
    });
})