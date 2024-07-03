const mongoose = require('mongoose')
const validator = require('validator')

const employeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name']
    },
    email: {
        type: String,
        required: [true, 'Please enter Email Id'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    avatar: {
        type: String,
    },
    employeeType: {
        type: String,
        required: true,
    }, 
    role:{
        type:String,
        default:'employee'
    },
    phoneNumber: {
        type: String,
        required: true
    },
    // tasks: [
    //     {
    //         orderId: {
    //             type: mongoose.SchemaTypes.ObjectId,
    //             required: true,
    //             ref: 'Order'
    //         },
    //         orderItemId: {
    //             type: mongoose.SchemaTypes.ObjectId,
    //             required: true,
    //             ref: 'Order.orderItems'
    //         }
    //     }
    // ]
})

module.exports = mongoose.model("Employee", employeeSchema)
