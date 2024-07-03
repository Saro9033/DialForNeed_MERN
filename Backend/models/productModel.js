const mongoose = require('mongoose')


//category ID and Brand ID pending
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true,
        maxLength: [100, "Product name cannot exceed 100 characters"]
    },
    price: {
        type: Number,
        required: [true, "Please enter product Price"],
        default: 0
    },
    description: {
        type: String,
        required: [true, "Please enter product description"],
    },
    ratings: {
        type: String,
        default: 0
    },
    categoryId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: [true, "Please Select product Category"],
        ref: 'Category'
    },
    category: {
        type: String,
    },
    brandId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: [true, "Please Select product Brand"],
        ref: 'Brand'
    },
    brand: {
        type: String,
    },
    images: [
        {
            image: {
                type: String,
                required: true
            }
        }
    ],
    type: {
        type: String,
        required: [true, "Please choose product type"],
    },
    stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        maxLength: [20, "Product stock cannot exceed 20"]
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            rating: {
                type: String,
                required: true,
            },
            comment: {
                type: String
            }
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Product", productSchema)

// {
//     "name": "Printer",
//     "price": 14000,
//     "description":"This is first product",
//     "ratings":"5",
//     "images":[
//         {"image":"images1.png"},
//         {"image":"images2.png"}
//     ],
//     "type":"sales",
//     "stock":20,
//     "numOfReviews":10,
//     "reviews":[
//         {
//             "name":"saravanan",
//             "rating":"4",
//             "comment":"Good product i ever seen"
//         }
//     ]
// }