const express = require('express')
const router = express.Router()
const {getAllBrands, createBrand, updateBrand, deleteBrand, getSingleBrand} = require('../controllers/brandController')
const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/authenticate')


router.route('/brands').get( getAllBrands)


//admin
router.route('/admin/brand').post(isAuthenticatedUser,authorizeRoles('admin'), createBrand)
router.route('/admin/brand/:id').put(isAuthenticatedUser,authorizeRoles('admin'), updateBrand)
                               .delete(isAuthenticatedUser,authorizeRoles('admin'), deleteBrand)
                               .get(isAuthenticatedUser, getSingleBrand)



module.exports = router