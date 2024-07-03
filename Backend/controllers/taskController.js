const Task = require('../models/taskModel')
const Employee = require('../models/employeeModel')
const Order = require('../models/orderModel')
const productModel = require('../models/productModel')
const OrderItem = require('../models/orderItemsModel')
const catchAsyncError = require('../middlewares/catchAsyncError')
const errorHandler = require('../utils/errorHandler')
const Brand =  require('../models/brandModel')
const Category =  require('../models/categoryModel')

exports.getAllTasksByEmployee = catchAsyncError(async (req, res, next) => {
    const employee = await Task.findById(req.params.id)
    if (!employee) {
        return next(new errorHandler(`Employee not found with ID: ${req.params.id}`, 404));
    }
});



// Admin: Assign tasks to employee = admin/assigntask/:id
exports.assignTask = catchAsyncError(async (req, res, next) => {
    try {
        // Find the employee by ID
        let employee = await Employee.findById(req.body.employeeId);
        if (!employee) {
            return next(new errorHandler(`Employee not found with ID: ${req.body.employeeId}`, 404));
        }
        
        // Find the order by ID
        let order = await Order.findById(req.params.id);
        if (!order) {
            return next(new errorHandler(`Order not found with ID: ${req.params.id}`, 404));
        }

        // Find the order item by ID
        let orderItem = await OrderItem.findById(req.body.orderItemId);
        if (!orderItem) {
            return next(new errorHandler(`OrderItem not found with ID: ${req.body.orderItemId}`, 404));
        }

        // Check if a task already exists for the given order and orderItem
        let existingTask = await Task.findOne({ order: order._id, orderItem: orderItem._id });

        if (existingTask) {
            // If a task already exists, update the employee ID only
            existingTask.employee = employee._id;
            await existingTask.save();

            res.status(200).json({
                success: true,
                task: existingTask
            });
        } else {
            // Create Task since it doesn't exist
            let task = await Task.create({
                order: order._id,
                orderItem: orderItem._id,
                employee: employee._id
            });

            res.status(200).json({
                success: true,
                task
            });
        }
    } catch (error) {
        next(error);
    }
});



//Admin : Get all tasks
exports.getAllTasks = catchAsyncError(async (req, res, next) => {
    const tasks = await Task.find()
        .populate({
            path: 'order',
            select: 'user', // Select the user field from the Order model
            populate: {
                path: 'user',
                select: 'name phoneNumber' // Select specific fields from the User model
            }
        })
        .populate({
            path: 'orderItem',
            select: 'productId status', // Select fields from OrderItem model
            populate: {
                path: 'productId',
                select: 'name price' // Select specific fields from the Product model
            }
        })
        .populate({
            path: 'employee',
            select: 'name phoneNumber employeeType' // Select fields from Employee model
        });

    res.status(200).json({
        success: true,
        tasks
    });
});
 
//Admin : Get task by id = '/admin/task/:id'
exports.getTaskById = catchAsyncError(async (req, res, next) => {
    const taskId = req.params.id; // Assuming taskId is passed in the request params

    const task = await Task.findById(taskId)
        .populate({
            path: 'order',
            select: 'user paidAt', // Select the user field from the Order model
            populate: {
                path: 'user',
                select: 'name email  phoneNumber address city' // Select specific fields from the User model
            }
        })
        .populate({
            path: 'orderItem',
            select: 'productId status quantity isRequested', // Select fields from OrderItem model
            populate: {
                path: 'productId',
                select: 'name images description price' // Select specific fields from the Product model
            }
        })
        .populate({
            path: 'employee',
            select: 'name email phoneNumber employeeType' // Select fields from Employee model
        });

    if (!task) {
        return res.status(404).json({
            success: false,
            message: 'Task not found'
        });
    }

    res.status(200).json({
        success: true,
        task
    });
});


//Admin : Get employee = admin/getEmployees
exports.getEmployees = catchAsyncError(async (req, res, next) => {

    console.log(req.params.orderItemId)
    const task = await Task.find()
        .populate({
            path: 'employee',
            select: 'name email phoneNumber employeeType' // Select fields from Employee model
        });

    if (!task) {
        return res.status(404).json({
            success: false,
            message: 'Task not found'
        });
    }

    res.status(200).json({
        success: true,
        task
    });
});

//delete
exports.deleteTask = catchAsyncError(async (req, res, next) => {
    let task = await Task.findById(req.params.id);
    if (!task) {
        return next(new errorHandler("Task not found ", 400))
    }
    try {
        await task.deleteOne()
        res.status(201).json({
            success: true,
            task: "Task deleted Successfully"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
})




//############################### For employee dashboard ##############################################

//get tasks by employee = api/employee/gettasks
exports.getTasksByEmployee = catchAsyncError(async (req, res, next) => {
    const task = await Task.find({ employee: req.user.id})
    .populate({
        path: 'order',
        select: 'user paidAt', // Select the user field from the Order model
        populate: {
            path: 'user',
            select: 'name email avatar phoneNumber' // Select specific fields from the User model
        }
    }) .populate({
        path: 'orderItem',
        select: 'productId status quantity isRequested', // Select fields from OrderItem model
        populate: {
            path: 'productId',
            select: 'name images description price' // Select specific fields from the Product model
        }
    })
    res.status(200).json({
        success: true,
        task
    });
});


//put method requested to true by employee = api/employee/requested
exports.updateRequested = catchAsyncError(async (req, res, next) => {
    // Validate if req.params.id exists and is valid
    if (!req.params.id) {
        return res.status(400).json({
            success: false,
            message: 'OrderItemId is required in params.'
        });
    }

    // Find the orderItem by its ID
    const orderItem = await OrderItem.findById(req.params.id);

    if (!orderItem) {
        return res.status(404).json({
            success: false,
            message: 'OrderItem not found.'
        });
    }

    // Toggle isRequested field
    orderItem.isRequested = !orderItem.isRequested;
    if(orderItem.isRequested === false){
        orderItem.status = "pending"
    }
    // Save the updated orderItem
    await orderItem.save();

    res.status(200).json({
        success: true,
        orderItem: orderItem // Return the updated orderItem
    });
});




//get users requested lists = api/user/requests
exports.userRequests = catchAsyncError(async (req, res, next) => {
    const orderItems = await OrderItem.find({isRequested:true, user:req.user.id})
    .populate({
        path: 'productId',
        select: 'name images description price type brandId categoryId', // Select specific fields from the Product model
        populate: [
            {
                path: 'brandId', // Populate the 'brandId' field of the Product model
                select: 'title' // Select specific fields from the Brand model
            },
            {
                path: 'categoryId', // Populate the 'categoryId' field of the Product model
                select: 'title' // Select specific fields from the Category model
            }
        ]
    });

    // Check if orderItems is empty or null
    if (!orderItems || orderItems.length === 0) {
        return res.status(404).json({
            success: false,
            message: 'No requested items found for the user.'
        });
    }
    res.status(200).json({
        success: true,
        requests: orderItems // Return the updated orderItem
    });
});


//update Status by user  = api/user/updateReq/:OrderItemId
exports.updateRequestStatus = catchAsyncError(async (req, res, next) => {
    const { OrderItemId } = req.params;
    const { status } = req.body;

    // Validate request body
    if (typeof status !== 'boolean') {
        return res.status(400).json({
            success: false,
            message: 'Invalid status value. Status must be a boolean.'
        });
    }

    // Find the order item by ID and user
    const orderItem = await OrderItem.findOne({ _id: OrderItemId, user: req.user.id });

    // Check if order item exists
    if (!orderItem) {
        return res.status(404).json({
            success: false,
            message: 'OrderItem not found for the user.'
        });
    }

    // Update status based on the boolean value
    orderItem.status = status ? 'Completed' : 'Not Completed';

    // Save the updated order item
    await orderItem.save();

    // Return success response with updated order items
    res.status(200).json({
        success: true,
        message: `OrderItem status updated to ${orderItem.status}`,
        orderItem
    });
});

