const mongoose = require('mongoose')


const carouselSchema = mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Carousel", carouselSchema)
