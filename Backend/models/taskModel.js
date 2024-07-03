const mongoose = require('mongoose')


const taskSchema = mongoose.Schema({ 
    order:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    orderItem:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem'
    },
    employee:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }
})

module.exports = mongoose.model("Tasks", taskSchema)
