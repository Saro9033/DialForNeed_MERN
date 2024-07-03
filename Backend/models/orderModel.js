const mongoose = require('mongoose')

//pending = employee id
const orderSchema = mongoose.Schema({

    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem'
    }],
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    paidAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    paymentInfo: {
        id: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            default: 'pending'
        }
    }
})

module.exports = mongoose.model("Order", orderSchema)
