const mongoose = require('mongoose')


const brandSchema = mongoose.Schema({ 
    title:{
        type:String,
        required:true,
        maxLength:30
    }
})



module.exports = mongoose.model("Brand", brandSchema)
