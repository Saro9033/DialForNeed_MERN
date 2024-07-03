const express = require('express')
const router = express.Router()
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate')

const { updateProfile, createEmployeeByAdmin, getAllEmployees, getSingleEmployee, deleteEmployee } = require('../controllers/employeeController')






//Admin 
router.route('/admin/employee/create').post(isAuthenticatedUser, authorizeRoles('admin'), createEmployeeByAdmin)
router.route('/admin/employees').get(isAuthenticatedUser, authorizeRoles('admin'), getAllEmployees)
router.route('/admin/employee/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateProfile)
router.route('/admin/employee/:id').get(isAuthenticatedUser, authorizeRoles('admin'), getSingleEmployee)
                                   .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteEmployee)
                                   
module.exports = router