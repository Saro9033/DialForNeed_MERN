const catchAsyncError = require('../middlewares/catchAsyncError')
const Order = require('../models/orderModel')
const errorHandler = require('../utils/errorHandler')
const productModel = require('../models/productModel')
const OrderItem = require('../models/orderItemsModel')
const User = require('../models/userModel')


//get all order items
exports.getAllOrderItems= catchAsyncError(async (req, res) => {
    const orderItems = await OrderItem.find()
    try {
        res.status(200).json({
            success: true,
            orderItems
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
})










//Create new order by user = api/order/new
exports.newOrder = catchAsyncError(async (req, res, next) => {
    const { totalPrice, orderItems, paymentInfo } = req.body;

    try {
        // Create the order items first
        const createdOrderItems = await OrderItem.insertMany(orderItems.map(item => ({ ...item, user: req.user.id })));

        // Get the IDs of the created order items
        const orderItemIds = createdOrderItems.map(item => item._id);

        const order = new Order({
            orderItems: orderItemIds,
            totalPrice,
            paymentInfo,
            paidAt: Date.now(),
            user: req.user.id
        });
        const createdOrder = await order.save();

        // Send response
        res.status(200).json({
            success: true,
            order: createdOrder
        });
    } catch (error) {
        console.error(`Error creating new order: ${error.message}`);
        return next(error);
    }
});


// Get single order by user = api/order/:id
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;

    try {
        const order = await Order.findById(id)
            .populate({
                path: 'orderItems',
                populate: {
                    path: 'productId',
                    model: 'Product',
                    select: 'name price images type'
                }
            });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const findUser = await User.findById(order.user.toString());

        res.status(200).json({
            success: true,
            order: { ...order.toObject(), user: findUser }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Get logged user's orders - to show ordered items = api/myorders
exports.myOrders = catchAsyncError(async (req, res, next) => {
    try{
        const order = await Order.find({ user: req.user.id }).populate({
        path: 'orderItems',
        populate: {
            path: 'productId',
            model: 'Product',
            select: 'name price images type'
        }
    });

    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
        success: true,
        order
    });}
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Admin: Get all orders - api/admin/orders
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
    try {
        const orders = await Order.find()
            .populate({
                path: 'orderItems',
                populate: {
                    path: 'productId',
                    model: 'Product',
                    select: 'name price images type'
                }
            })
            .populate({
                path: 'user',
                model: 'User',
                select: 'name email phoneNumber' // Adjust fields as needed
            });

        res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

//Admin: Get single order by user = api/admin/order/:id
exports.getSingleOrderByAdmin = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;

    try {
        const order = await Order.findById(id)
            .populate({
                path: 'orderItems',
                populate: {
                    path: 'productId',
                    model: 'Product',
                    select: 'name price images type'
                }
            });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const findUser = await User.findById(order.user.toString());

        res.status(200).json({
            success: true,
            order: { ...order.toObject(), user: findUser }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

//#############Pending################
//Admin : Update order = Order status  = api/admin/order/:orderId body=orderItemId & "delivered"
exports.updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    order.orderItems.map(async item => {
        if (item._id?.toString() == req.body.itemId?.toString()) {
            if (item.orderStatus == 'Delivered') {
                return next(new errorHandler(`Order has been already delivered!`, 400))
            }

            item.orderStatus = req.body.orderStatus;
            item.deliveredAt = Date.now();
            await item.save()
        }
    })

    //updating the product stock of each order item
    order.orderItems.forEach(async orderItem => {
        await updateStock(orderItem.product, orderItem.quantity)
    })
    await order.save()
    res.status(200).json({
        success: true
    })
})

async function updateStock(productId, quantity) {
    const product = await productModel.findById(productId);
    if (!product) {
        throw new Error(`Product not found with ID: ${productId}`);
    }
    product.stock = product.stock - quantity;
    await product.save({ validateBeforeSave: false });
}


//Admin : Delete order -  api/admin/order/:Id
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new errorHandler(`Order not found with this id: ${req.user.id}`, 404))
    }

    await order.deleteOne()
    res.status(200).json({
        success: true
    })
})


// Delete order item by ID = api/orderItem/:id
exports.deleteOrderItem = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;

    try {
        // Find the order item to delete
        const orderItem = await OrderItem.findById(id);
        if (!orderItem) {
            return res.status(404).json({ message: 'Order item not found' });
        }
        const order = await Order.findOne({ orderItems: id });
        if (!order) {
            return res.status(404).json({ message: 'Order not found for this order item' });
        }

        // Remove the order item from the order
        order.orderItems.pull(id);
        await order.save();

        // Delete the order item
        await orderItem.deleteOne();

        // Check if the order has no more order items
        if (order.orderItems.length === 0) {
            await Order.findByIdAndDelete(order._id);
        }

        res.status(200).json({
            success: true,
            message: 'Order item deleted successfully',
            order
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});