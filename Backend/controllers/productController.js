const catchAsyncError = require('../middlewares/catchAsyncError')
const productModel = require('../models/productModel')
const errorHandler = require('../utils/errorHandler')
const APIFeatures = require('../utils/apiFeautures')
const CategoryModel = require('../models/categoryModel')
const BrandModel = require('../models/brandModel')


const getTitle = async (Model, id, fieldName) => {
    try {
        const result = await Model.findById(id, fieldName);
        if (!result) {
            throw new Error(`${Model.modelName} not found`);
        }
        return result[fieldName];
    } catch (error) {
        throw new Error(`Error getting ${fieldName} of ${Model.modelName}: ${error.message}`);
    }
};

//Get all product - /products
exports.getAllProduct = catchAsyncError(async (req, res, next) => {

    const apiFeatures = new APIFeatures(productModel.find(), req.query).search().filter();

    try {
        let products = await apiFeatures.query;
        
        // Retrieve category titles for each product asynchronously
        await Promise.all(products.map(async prod => {
            const categoryTitle = await getTitle(CategoryModel, prod.categoryId?.toString(), 'title');
            prod.category = categoryTitle;
            const brandTitle = await getTitle(BrandModel, prod.brandId?.toString(), 'title');
            prod.brand = brandTitle;
        }));

        res.status(200).json({
            success: true,
            count: products.length,
            products: products
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});


//Create new product - /products/new
exports.addProduct = catchAsyncError(async (req, res) => {
    let images = []

    if(req.files?.length > 0){
        req.files.forEach((file)=>{
            let BASE_URL = process.env.STATIC_URL
            if(process.env.NODE_ENV === "production"){
                BASE_URL = `${req.protocol}://${req.get('host')}/`
            }
            let url = `${BASE_URL}uploads/product/${file.originalname}`
            images.push({image:url})
        })
    }

    req.body.images = images;

    req.body.user = req.user.id
    const product = await productModel.create(req.body)
    try {
        res.status(200).json({
            success: true,
            product
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
})

//Get product by ID - /product/{id}
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
    const product = await productModel.findById(req.params.id).populate('reviews.user', 'name email avatar');
    if (!product) {
        return next(new errorHandler("Product not found ", 400))
    }
    product.category = await getTitle(CategoryModel, product.categoryId?.toString(), 'title');
    product.brand = await getTitle(BrandModel, product.brandId?.toString(), 'title');

   
    try {
        res.status(201).json({
            success: true,
            product
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
})


// Update Product - /products/{id}
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await productModel.findById(req.params.id);

    if (!product) {
        return next(new errorHandler("Product not found", 404));
    }

    // Handle images
    let images = product.images; // Default to current images

    // If imagesToDelete is provided, remove specified images
    if (req.body.imagesToDelete) {
        const imagesToDelete = JSON.parse(req.body.imagesToDelete);
        images = images.filter(img => !imagesToDelete.includes(img.image));
    }

    // If new images are provided, add them to the existing images
    let BASE_URL = process.env.STATIC_URL
    if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}/`
    }
    if (req.files && req.files.length > 0) {
        images = [
            ...images,
            ...req.files.map(file => {
                return { image: `${BASE_URL}uploads/product/${file.originalname}` };
            })
        ];
    }

    req.body.images = images;

    try {
        // Update the product
        const updatedProduct = await productModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        res.status(200).json({
            success: true,
            product: updatedProduct
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});




//Delete Product - product
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    let product = await productModel.findById(req.params.id);
    if (!product) {
        return next(new errorHandler("Product not found ", 400))
    }
    try {
        await product.deleteOne()
        res.status(201).json({
            success: true,
            product: "Product deleted Successfully"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
})



//Create Review = /api/review
exports.createReview = catchAsyncError(async (req, res, next) => {
    const { productId, rating, comment } = req.body;
    const review = {
        user: req.user.id,
        rating,
        comment
    };

    // Get product by product id
    const product = await productModel.findById(productId);
    if (!product) {
        return next(new errorHandler('Product not found', 404));
    }

    // Find if the user has already submitted a review
    const isReviewed = product.reviews.find(review => review.user && review.user.toString() === req.user.id.toString());

    if (isReviewed) {
        // Update the existing review
        product.reviews.forEach(review => {
            if (review.user && review.user.toString() == req.user.id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        });
    } else {
        // Add a new review
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    // Calculate the average rating
    const totalRatings = product.reviews.reduce((acc, review) => acc + review.rating, 0);
    product.ratings = totalRatings / product.reviews.length;

    product.ratings = isNaN(product.ratings) ? 0 : product.ratings
    // Save the product with the updated reviews and ratings
    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: 'Review updated successfully'
    });
});



//Get all Reviews of a product = api/reviews?id={product}
exports.getAllReviews = catchAsyncError(async (req, res, next) => {
    const product = await productModel.findById(req.query.id).populate('reviews.user', 'name email phoneNumber')

    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
})


//delete review - api/review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await productModel.findById(req.query.productId)

    //filtering the reviews after deleted doesn't match review Id
    const reviews = product.reviews.filter(review => {
        review._id?.toString() !== req.query.reviewId?.toString()
    })
    //update the num. of reviews
    const numOfReviews = reviews.length;

    //finding the average with the filtered revies
    let ratings = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;
    ratings = isNaN(ratings) ? 0 : ratings

    //updating to product latest data after delete
    await productModel.findByIdAndUpdate(req.query.productId, {
        reviews, numOfReviews, ratings
    })

    res.status(200).json({
        success: true
    })
})


//Admin: get products = /admin/products
exports.getAdminProducts = catchAsyncError(async (req, res, next) => { 
    const products = await productModel.find()
    
    await Promise.all(products.map(async prod => {
        const categoryTitle = await getTitle(CategoryModel, prod.categoryId?.toString(), 'title');
        prod.category = categoryTitle;
        const brandTitle = await getTitle(BrandModel, prod.brandId?.toString(), 'title');
        prod.brand = brandTitle;
    }));
    res.status(200).json({
        success:true,
        products
    })
})