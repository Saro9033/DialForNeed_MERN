const express = require('express')
const router = express.Router()
const {isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate')
const { newOrder, getSingleOrder, myOrders, getAllOrders , updateOrder, deleteOrder, deleteOrderItem, getSingleOrderByAdmin, getAllOrderItems} = require('../controllers/orderController')

router.route('/order/new').post(isAuthenticatedUser , newOrder)
router.route('/order/:id').get(isAuthenticatedUser , getSingleOrder)
router.route('/myorders').get(isAuthenticatedUser,myOrders)

//delete particular orderItem
router.route('/orderitem/:id').delete(isAuthenticatedUser,deleteOrderItem)


//Admin routes
router.route('/admin/orders').get(isAuthenticatedUser,authorizeRoles('admin'), getAllOrders)
router.route('/admin/orderItems').get(isAuthenticatedUser,authorizeRoles('admin'), getAllOrderItems)
router.route('/admin/order/:id').put(isAuthenticatedUser,authorizeRoles('admin'), updateOrder)
                                .delete(isAuthenticatedUser,authorizeRoles('admin'), deleteOrder)
                                .get(isAuthenticatedUser,authorizeRoles('admin'),getSingleOrderByAdmin)

module.exports = router