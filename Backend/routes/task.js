const express = require('express')
const router = express.Router()
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate')
const { assignTask, getAllTasks, getTaskById, getTasksByEmployee, getEmployees, deleteTask, updateRequested, userRequests, updateRequestStatus } = require('../controllers/taskController')

//user
router.route('/user/getRequests').get(isAuthenticatedUser, userRequests)
router.route('/user/updateRequests/:OrderItemId').put(isAuthenticatedUser, updateRequestStatus)


//Employee
router.route('/employee/gettasks').get(isAuthenticatedUser, getTasksByEmployee)
router.route('/employee/requested/:id').put(isAuthenticatedUser, authorizeRoles('admin','employee'), updateRequested)

//Admin
router.route('/admin/assigntask/:id').post(isAuthenticatedUser, authorizeRoles('admin'), assignTask)
router.route('/admin/gettasks').get(isAuthenticatedUser, authorizeRoles('admin'), getAllTasks)
router.route('/admin/task/:id').get(isAuthenticatedUser, authorizeRoles('admin','employee'), getTaskById)
                               .delete(isAuthenticatedUser, authorizeRoles('admin'),deleteTask)
router.route('/admin/getEmployees').get(isAuthenticatedUser, authorizeRoles('admin'), getEmployees)




module.exports = router