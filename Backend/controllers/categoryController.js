const catchAsyncError = require('../middlewares/catchAsyncError')
const Category = require('../models/categoryModel')
const errorHandler = require('../utils/errorHandler')
const Product = require('../models/productModel')


//Admin:  creating category = api/admin/category
exports.createCategory = catchAsyncError(async (req, res) => {
    const {title} = req.body

    let BASE_URL = process.env.STATIC_URL
    if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}/`
    }
     const image = req.file ? `${BASE_URL}uploads/category/${req.file.originalname}` : null;

    const category = await Category.create({
        title, image
    })
    try {
        res.status(200).json({
            success: true,
            category
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
})

//Admin and users:  get all category = api/categories
exports.getAllCategory = catchAsyncError(async (req, res) => {
    const category = await Category.find()
    try {
        res.status(200).json({
            success: true,
            category
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
})

//Admin:  update category = api/admin/category/:id
// exports.updateCategory = catchAsyncError(async (req, res) => {
//     let category = await Category.findById(req.params.id)
//     if (!category) {
//         return next(new errorHandler("Category not found ", 400))
//     }
//     try {
//         category = await Category.findByIdAndUpdate(req.params.id, req.body,
//             {
//                 new: true,
//                 runValidators: true
//             }
//         );

//         res.status(201).json({
//             success: true,
//             category
//         });
//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             error: error.message
//         })
//     }
// })

//Admin: update category = api/admin/category/:id
exports.updateCategory = catchAsyncError(async (req, res) => {
    const { title } = req.body;
    let image = null;

    // Check if req.file exists to update image URL
    if (req.file) {
        let BASE_URL = process.env.STATIC_URL;
        if (process.env.NODE_ENV === "production") {
            BASE_URL = `${req.protocol}://${req.get('host')}/`;
        }
        image = `${BASE_URL}uploads/category/${req.file.originalname}`;
    }

    // Prepare update fields based on what's provided in the request
    const updateFields = {};
    if (title) {
        updateFields.title = title;
    }
    if (image) {
        updateFields.image = image;
    }

    // Find the category by ID and update it
    const category = await Category.findByIdAndUpdate(req.params.id, updateFields, {
        new: true, // Return the updated document
        runValidators: true, // Run validators to ensure data validation
    });

    if (!category) {
        return res.status(404).json({
            success: false,
            error: 'Category not found',
        });
    }

    // Handle success response
    res.status(200).json({
        success: true,
        category,
    });
});



//Admin : get category by Id =  api/admin/category/:id
exports.getSingleCategory = catchAsyncError(async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        return next(new errorHandler("Product not found ", 400))
    }
    try {
        res.status(201).json({
            success: true,
            category
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
})


// Admin: delete category = api/admin/category/:id
exports.deleteCategory = catchAsyncError(async (req, res, next) => {
    try {
        let category = await Category.findById(req.params.id);

        if (!category) {
            return next(new errorHandler("Category is not found", 404));
        }

        // Find products associated with this category
        const products = await Product.find({ categoryId: req.params.id });

        if (products.length > 0) {
            return res.status(400).json({
                success: false,
                message: `This category has ${products.length} products, so you can't delete it`
            });
        }

        // If no products are associated, delete the category itself
        await category.deleteOne();

        res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});
