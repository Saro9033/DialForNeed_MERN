const express = require('express')
const router = express.Router()
const {createCategory, getAllCategory, updateCategory,deleteCategory,getSingleCategory} = require('../controllers/categoryController')
const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/authenticate')

//for storing avatar images into uploads folder
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '..','uploads/category'));
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage });


router.route('/categories').get(getAllCategory)


//admin
router.route('/admin/category').post(isAuthenticatedUser,authorizeRoles('admin'),upload.single('image'), createCategory)
router.route('/admin/category/:id').put(isAuthenticatedUser,authorizeRoles('admin'),upload.single('image'), updateCategory)
                               .delete(isAuthenticatedUser,authorizeRoles('admin'), deleteCategory)
                               .get(isAuthenticatedUser, getSingleCategory)



module.exports = router