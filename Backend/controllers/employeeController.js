const catchAsyncError = require('../middlewares/catchAsyncError')
const Employee = require('../models/employeeModel')
const errorHandler = require('../utils/errorHandler')
const User = require("../models/userModel");

const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

exports.createEmployeeByAdmin = catchAsyncError(async (req, res) => {
    const {
        email, password, employeeType, name, phoneNumber
    } = req.body;

    // Generate a new ObjectId
    const userId = new ObjectId();

    // Create User record with the generated ObjectId
    const mergeToUser = await User.create({
        _id: userId,
        email,
        role: "employee",
        password,
        name,
        phoneNumber
    });

    // Create Employee record with the same ObjectId
    const employee = await Employee.create({
        _id: userId,
        email,
        employeeType,
        name,
        phoneNumber
    });

    // Return success response
    res.status(200).json({
        success: true,
        employee
    });
});


//get all Employees
exports.getAllEmployees = catchAsyncError(async (req, res) => {
    const employees = await Employee.find()
    try {
        res.status(200).json({
            success: true,
            employees
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
})


//Admin : get employee by Id =  api/admin/employee/:id
exports.getSingleEmployee= catchAsyncError(async (req, res, next) => {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
        return next(new errorHandler("Employee not found ", 400))
    }
    try {
        res.status(201).json({
            success: true,
            employee
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
})

//Admin : Delete Employee - api/admin/employee/:id
exports.deleteEmployee = catchAsyncError(async (req, res, next) => {
    let employee = await Employee.findById(req.params.id);
    if (!employee) {
        return next(new errorHandler("Employee not found ", 400))
    }
    const findUserEmployee = await User.findOne({_id:employee._id})

    if (!findUserEmployee) {
        return next(new errorHandler("Employee not found ", 400))
    }
    try {
   
        await findUserEmployee.deleteOne()
        await employee.deleteOne()
        res.status(201).json({
            success: true,
            employee: "Employee deleted Successfully"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
})

//updating Employee = admin/employee/:id
exports.updateProfile = catchAsyncError(async (req, res) => {
    let employee = await Employee.findById(req.params.id)
    if (!employee) {
        return next(new errorHandler("Employee not found with this id ", 400))
    }
    const { name, email, phoneNumber } = req.body
    employee = await Employee.findByIdAndUpdate(req.params.id, { name, email, phoneNumber },
        {
            new: true,
            runValidators: true
        }
    );
    let userEmployee = await User.findOne({ _id: employee._id })
    if (!userEmployee) {
        return next(new errorHandler("Employee not found with this id ", 400))
    }
    userEmployee = await User.findByIdAndUpdate(userEmployee._id?.toString(), { name, email, phoneNumber },
        {
            new: true,
            runValidators: true
        }
    );
    res.status(201).json({
        success: true,
        employee
    });
})




// ############################################pending##################################################################








