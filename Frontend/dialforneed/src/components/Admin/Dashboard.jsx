import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Products, adminProducts, productStatus } from '../../slices/ProductsSlice'
import { AdminOrders, OrderItems, getAdminOrders, getAllOrderItems } from '../../slices/orderSlice'
import { allUsers, fetchUsers } from '../../slices/AdminUserSlice'
import { Link } from 'react-router-dom'
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import { FaProductHunt } from "react-icons/fa6";
import { FaBasketShopping } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { PiEmptyDuotone } from "react-icons/pi";
import { MdCategory } from "react-icons/md";
import {  MdBrandingWatermark  } from "react-icons/md";
import { PiUsersThreeFill  } from "react-icons/pi";
import {  RiTaskFill  } from "react-icons/ri";
import { MdOutlinePendingActions } from "react-icons/md";
import { CategoriesData, fetchCategory } from '../../slices/CategorySlice'
import { BrandData, fetchBrands } from '../../slices/BrandSlice'
import { EmployeesData, fetchEmployees } from '../../slices/EmployeeSlice'
import { TasksData, fetchTasks } from '../../slices/TaskSlice'

const Dashboard = () => {
    const adminProductsData = useSelector(Products)
    const dispatch = useDispatch()

    let outOfStock = 0

    if (adminProductsData.length > 0) {
        adminProductsData.forEach(product => {
            if (product.stock === 0) {
                outOfStock++
            }
        })
    }


    useEffect(() => {
        dispatch(adminProducts())
        dispatch(fetchUsers())
        dispatch(getAdminOrders())
        dispatch(fetchCategory())
        dispatch(fetchBrands())
        dispatch(fetchEmployees())
        dispatch(fetchTasks())
        dispatch(getAllOrderItems())
    }, [dispatch])

    const adminOrders = useSelector(AdminOrders)
    const AllUsers = useSelector(allUsers)
    const Categories= useSelector(CategoriesData)
    const Brands= useSelector(BrandData)
    const Employees = useSelector(EmployeesData)
    const Tasks = useSelector(TasksData)
    const allOrderItems = useSelector(OrderItems)

    let totalAmount = 0
    if (adminOrders.length > 0) {
        adminOrders.forEach(order => {
            totalAmount += order.totalPrice
        })
    }

    const calculatePending = (orderItems, tasks) => {
        // Convert tasks array to a set for faster lookup
        const taskIds = new Set(tasks?.map(task => task?.orderItem?._id));

        console.log(taskIds)
        // Count pending items
        let pendingCount = 0;
        orderItems?.forEach(item => {
           
            if (!taskIds.has(item._id)) {
                pendingCount++;
            }
        });
    
        return pendingCount;
    }
 console.log(Tasks)
//  console.log(allOrderItems)


    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };



    return (
        <div >
            <h2 >Dashboard</h2>
            <div className="row m-0">
                <div className="col-xl-12 col-sm-12 mb-3">
                    <div className="card text-black shadow-sm rounded-2 border o-hidden h-100">
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-center">
                                <div style={{
                                    width: '70px',
                                    height: '70px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: '50%',
                                    backgroundColor: 'rgba(0, 128, 0, 0.2)', // Light green with opacity
                                    border: '15px solid rgba(0, 128, 0, 0.4)', // Darker green with opacity
                                }}>
                                    <div style={{
                                        backgroundColor: 'rgba(0, 128, 0, 0.8)', // Solid green
                                        padding: '10px',
                                        borderRadius: '50%',
                                    }}>
                                        <HiOutlineCurrencyRupee fontSize="2rem" color='white' className='p-0' />
                                    </div>
                                </div>
                            </div>
                            <div className="text-center card-font-size">Total Amount<br /> <b>{formatCurrency(totalAmount)}</b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row m-0">
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3">
                    <div className="card text-dark shadow-sm rounded-2 border  o-hidden h-100">
                        <div className="card-body d-flex align-items-center justify-content-start">
                            <div style={{
                                width: '70px',
                                height: '70px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(13,202,240, 0.2)', // Light green with opacity
                            }}>
                                <span className='p-5'>
                                    <FaProductHunt fontSize="1.8rem" style={{ color: 'rgba(13,202,240)' }} className='p-0' />
                                </span>
                            </div>
                            <div className="pl-3 card-font-size">Products<br /> <b>{adminProductsData.length}</b></div>
                        </div>
                        <Link href='/admin/products' className="card-footer text-dark clearfix small z-1" to="/admin/products">
                            <span className="float-left">View Details</span>
                            <span className="float-right">
                                <i className="fa fa-angle-right"></i>
                            </span>
                        </Link>
                    </div>
                </div>


                <div className="col-xl-4 col-lg-4 col-md-6  col-sm-6 mb-3">
                    <div className="card text-dark bg-white o-hidden h-100">
                        <div className="card-body d-flex align-items-center justify-content-start">
                            <div style={{
                                width: '70px',
                                height: '70px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(220,53,69, 0.2)', // Light green with opacity
                            }}>
                                <span className='p-5'>
                                    <FaBasketShopping fontSize="1.8rem" style={{ color: 'rgb(220,53,69)' }} className='p-0' />
                                </span>
                            </div>
                            <div className="pl-3 card-font-size">Orders<br /> <b>{adminOrders.length}</b></div>
                        </div>
                        <Link className="card-footer  clearfix text-dark small z-1" to="/admin/orders">
                            <span className="float-left">View Details</span>
                            <span className="float-right">
                                <i className="fa fa-angle-right"></i>
                            </span>
                        </Link>
                    </div>
                </div>


                <div className="col-xl-4 col-lg-4 col-md-6  col-sm-6 mb-3">
                    <div className="card text-dark bg-white o-hidden h-100">
                        <div className="card-body d-flex align-items-center justify-content-start">
                            <div style={{
                                width: '70px',
                                height: '70px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(255,193,7, 0.2)', // Light green with opacity
                            }}>
                                <span className='p-5'>
                                    <FaUserCircle fontSize="1.8rem" style={{ color: 'rgb(255,193,7)' }} className='p-0' />
                                </span>
                            </div>
                            <div className=" pl-3 card-font-size">Users<br /> <b>{AllUsers.length}</b></div>
                        </div>
                        <Link className="card-footer  text-dark clearfix small z-1" to="/admin/users">
                            <span className="float-left">View Details</span>
                            <span className="float-right">
                                <i className="fa fa-angle-right"></i>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="row m-0">
                <div className="col-xl-4 col-lg-4 col-md-6  col-sm-6 mb-3">
                    <div className="card text-dark shadow-sm rounded-2 border  o-hidden h-100">
                        <div className="card-body d-flex align-items-center justify-content-start">
                            <div style={{
                                width: '70px',
                                height: '70px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(301,100, 38, 0.2)', // Light green with opacity
                            }}>
                                <span className='p-5'>
                                    <PiEmptyDuotone fontSize="1.8rem" style={{ color: 'hsl(301,100%,38%)' }} className='p-0' />
                                </span>
                            </div>

                            <div className=" pl-3 card-font-size">Out of Stock<br /> <b>{outOfStock}</b></div>

                        </div>
                    </div>
                </div>


                <div className="col-xl-4 col-lg-4 col-md-6  col-sm-6 mb-3">
                    <div className="card text-dark bg-white o-hidden h-100">
                        <div className="card-body d-flex align-items-center justify-content-start">
                            <div style={{
                                width: '70px',
                                height: '70px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(0,237,189, 0.2)', // Light green with opacity
                            }}>
                                <span className='p-5'>
                                    <MdCategory fontSize="1.8rem" style={{ color: 'rgb(0,237,189)' }} className='p-0' />
                                </span>
                            </div>
                            <div className="pl-3 card-font-size">Categories<br /> <b>{Categories.length}</b></div>
                        </div>
                        <Link className="card-footer  clearfix text-dark small z-1" to="/admin/categories">
                            <span className="float-left">View Details</span>
                            <span className="float-right">
                                <i className="fa fa-angle-right"></i>
                            </span>
                        </Link>
                    </div>
                </div>


                <div className="col-xl-4 col-lg-4 col-md-6  col-sm-6 mb-3">
                    <div className="card text-dark bg-white o-hidden h-100">
                        <div className="card-body d-flex align-items-center justify-content-start">
                            <div style={{
                                width: '70px',
                                height: '70px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(240,0,255, 0.2)', // Light green with opacity
                            }}>
                                <span className='p-5'>
                                    <MdBrandingWatermark fontSize="1.8rem" style={{ color: 'rgb(240,0,255)' }} className='p-0' />
                                </span>
                            </div>
                            <div className=" pl-3 card-font-size">Brands<br /> <b>{Brands.length}</b></div>
                        </div>
                        <Link className="card-footer  text-dark clearfix small z-1" to="/admin/brands">
                            <span className="float-left">View Details</span>
                            <span className="float-right">
                                <i className="fa fa-angle-right"></i>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="row m-0">
                <div className="col-xl-4 col-lg-4 col-md-6  col-sm-6 mb-3">
                    <div className="card text-dark shadow-sm rounded-2 border  o-hidden h-100">
                        <div className="card-body d-flex align-items-center justify-content-start">
                            <div style={{
                                width: '70px',
                                height: '70px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(222,255,0, 0.2)', // Light green with opacity
                            }}>
                                <span className='p-5'>
                                    <PiUsersThreeFill fontSize="1.8rem" style={{ color: 'rgb(222,255,0)' }} className='p-0' />
                                </span>
                            </div>

                            <div className=" pl-3 card-font-size">Employees<br /> <b>{Employees.length}</b></div>

                        </div>
                        <Link className="card-footer text-dark clearfix small z-1" to="/admin/employees">
                            <span className="float-left">View Details</span>
                            <span className="float-right">
                                <i className="fa fa-angle-right"></i>
                            </span>
                        </Link>
                    </div>
                </div>


                <div className="col-xl-4 col-lg-4 col-md-6  col-sm-6 mb-3">
                    <div className="card text-dark bg-white o-hidden h-100">
                        <div className="card-body d-flex align-items-center justify-content-start">
                            <div style={{
                                width: '70px',
                                height: '70px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(66,255,0, 0.2)', // Light green with opacity
                            }}>
                                <span className='p-5'>
                                    <RiTaskFill fontSize="1.8rem" style={{ color: 'rgb(66,255,0)' }} className='p-0' />
                                </span>
                            </div>
                            <div className="pl-3 card-font-size">Tasks<br /> <b>{Tasks.length}</b></div>
                        </div>
                        <Link className="card-footer  clearfix text-dark small z-1" to="/admin/tasks">
                            <span className="float-left">View Details</span>
                            <span className="float-right">
                                <i className="fa fa-angle-right"></i>
                            </span>
                        </Link>
                    </div>
                </div>


                <div className="col-xl-4 col-lg-4 col-md-6  col-sm-6 mb-3">
                    <div className="card text-dark bg-white o-hidden h-100">
                        <div className="card-body d-flex align-items-center justify-content-start">
                            <div style={{
                                width: '70px',
                                height: '70px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(0,205,24, 0.2)', // Light green with opacity
                            }}>
                                <span className='p-5'>
                                    <MdOutlinePendingActions fontSize="1.8rem" style={{ color: 'rgb(0,205,24)' }} className='p-0' />
                                </span>
                            </div>
                            <div className=" pl-3 card-font-size">Pending Tasks<br /> <b>{calculatePending(allOrderItems, Tasks)}</b></div>
                        </div>
                     
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Dashboard