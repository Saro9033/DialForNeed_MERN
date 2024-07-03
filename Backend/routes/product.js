const express = require('express')
const router = express.Router()
const {addProduct, getAllProduct,getSingleProduct, updateProduct,deleteProduct,
    createReview,getAllReviews, deleteReview, 
    getAdminProducts} = require('../controllers/productController')
const {isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate')

//for storing Product images into uploads folder
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '..','uploads/product'));
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage });
  

router.route('/products').get( getAllProduct)
router.route('/product/:id').get(getSingleProduct)
                             

router.route('/review').put(isAuthenticatedUser ,createReview)
                             

 //Admin routes
 router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), upload.array('images'), addProduct)
 router.route('/admin/products').get(isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts)
 router.route('/admin/product/:id').delete(isAuthenticatedUser, authorizeRoles('admin'),deleteProduct)
                                   .put(isAuthenticatedUser, authorizeRoles('admin'),upload.array('images'),updateProduct)
router.route('/admin/reviews').get(isAuthenticatedUser,authorizeRoles('admin'), getAllReviews)
router.route('/admin/review').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteReview)


module.exports = router