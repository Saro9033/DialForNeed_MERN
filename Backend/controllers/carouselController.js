const errorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError')
const Carousel = require('../models/carouselModel')

//Get all Carousel - /getAllCarousels
exports.getAllCarousels = catchAsyncError(async (req, res, next) => {

    const carousels = await Carousel.find();
    try {
        res.status(200).json({
            success: true,
            carousels
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

//Create Carousels - /carousel/new
exports.createCarousel = catchAsyncError(async (req, res) => {
    const {link} = req.body

    let BASE_URL = process.env.STATIC_URL
    if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}/`
    }
    
     const image = req.file ? `${BASE_URL}uploads/carousel/${req.file.originalname}` : null;
    const carousel = await Carousel.create({
        link, image
    })
   
    res.status(200).json({
        success:true,
        carousel
    })
})


//Delete carousel - carousel/:id
exports.deleteCarousel = catchAsyncError(async (req, res, next) => {
    let carousel = await Carousel.findById(req.params.id);
    if (!carousel) {
        return next(new errorHandler("Carousel not found ", 400))
    }
    try {
        await carousel.deleteOne()
        res.status(201).json({
            success: true,
            carousel: "carousel deleted Successfully"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
})