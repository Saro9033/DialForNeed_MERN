const express = require('express')
const router = express.Router()
const {registerUser, loginUser, logoutUser, forgotPassword, resetPassword,
    getUserProfile, updateProfile,
    getAllUsersByAdmin, getSpecificUserByAdmin, deleteUserByAdmin} = require('../controllers/authController')

const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/authenticate')


//for storing avatar images into uploads folder
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '..','uploads/user'));
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage });
  
//routes for login/register users
router.route('/register').post(upload.single('avatar'), registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').post(resetPassword)

router.route('/myprofile').get(isAuthenticatedUser, getUserProfile)
router.route('/update').put(isAuthenticatedUser,upload.single('avatar'), updateProfile)


//Admin Routes
router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles('admin'), getAllUsersByAdmin)
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizeRoles('admin'), getSpecificUserByAdmin)
                               .delete(isAuthenticatedUser,authorizeRoles('admin'), deleteUserByAdmin)


module.exports = router