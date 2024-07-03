const catchAsyncError = require('../middlewares/catchAsyncError')
const Brand = require('../models/brandModel')
const errorHandler = require('../utils/errorHandler')
const Product = require('../models/productModel')


//Admin:  creating brand = api/admin/brand
exports.createBrand = catchAsyncError(async (req, res) => {
    const brand = await Brand.create(req.body)
    try {
        res.status(200).json({
            success: true,
            brand
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
})

//Admin and users:  get all brand = api/brands
exports.getAllBrands= catchAsyncError(async (req, res) => {
    const brand = await Brand.find()
    try {
        res.status(200).json({
            success: true,
            brand
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
})

//Admin:  update brand = api/admin/brand/:id
exports.updateBrand = catchAsyncError(async (req, res) => {
    let brand = await Brand.findById(req.params.id)
    if (!brand) {
        return next(new errorHandler("brand not found ", 400))
    }
    try {
        brand = await Brand.findByIdAndUpdate(req.params.id, req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(201).json({
            success: true,
            brand
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
})

//Admin : get brand by Id =  api/admin/brand/:id
exports.getSingleBrand = catchAsyncError(async (req, res, next) => {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
        return next(new errorHandler("Brand not found ", 400))
    }
    try {
        res.status(201).json({
            success: true,
            brand
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
})


// Admin: delete brand = api/admin/brand/:id
exports.deleteBrand = catchAsyncError(async (req, res, next) => {
    try {
        let brand = await Brand.findById(req.params.id);

        if (!brand) {
            return next(new errorHandler("Brand is not found", 404));
        }

        // Find products associated with this brand
        const products = await Product.find({ brandId: req.params.id });

        if (products.length > 0) {
            return res.status(400).json({
                success: false,
                message: `This brand has ${products.length} products, so you can't delete it`
            });
        }

        // If no products are associated, delete the brand itself
        await brand.deleteOne();

        res.status(200).json({
            success: true,
            message: "Brand deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});
