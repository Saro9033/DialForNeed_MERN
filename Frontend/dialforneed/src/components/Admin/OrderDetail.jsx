import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { clearOrderError, getOrderDetail, orderDetail, orderError, orderStatus } from '../../slices/orderSlice';
import { Row, Col } from 'react-bootstrap';
import { MDBDataTable } from 'mdbreact';
import { FaEdit } from 'react-icons/fa';
import './OrderDetail.css';
import { EmployeesData, fetchEmployees } from '../../slices/EmployeeSlice';
import { createTask, ClearTaskError, IsCreated, Error, ClearIsCreated,  ClearEmployee, Employees, fetchEmployeesTasks } from '../../slices/TaskSlice';

const OrderDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const OrderDetail = useSelector(orderDetail);
    const OrderStatus = useSelector(orderStatus);
    const OrderError = useSelector(orderError);
    const employees = useSelector(EmployeesData);
    const taskCreated = useSelector(IsCreated);
    const taskError = useSelector(Error);
    const employeeNames = useSelector(Employees);

    const [editItemId, setEditItemId] = useState(null);
    const [employeeId, setEmployeeId] = useState('');

    useEffect(() => {
        dispatch(getOrderDetail(id));
        dispatch(fetchEmployees());
        dispatch(fetchEmployeesTasks())
    }, [dispatch, id]);

    useEffect(() => {
        if (OrderError) {
            enqueueSnackbar(OrderError, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
                onExited: () => {
                    dispatch(clearOrderError());
                },
            });
        }
        if (taskError) {
            enqueueSnackbar(taskError, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
                onExited: () => {
                    dispatch(ClearTaskError());
                },
            });
        }
        if (taskCreated) {
            enqueueSnackbar("Task Assigned Successfully!", {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
                onExited: () => {
                    dispatch(ClearIsCreated());
                },
            });
            dispatch(fetchEmployeesTasks())
        }
    }, [taskCreated, OrderError, taskError, enqueueSnackbar, dispatch]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const handleEditClick = (itemId) => {
        setEditItemId(itemId);
    };

    const handleAssignTask = (orderItemId) => {
        const taskData = { id, taskData: { orderItemId, employeeId } };
        dispatch(createTask(taskData));
        setEditItemId(null);
        setEmployeeId('');
    };

    const setOrderDetails = () => {
        const data = {
            columns: [
                {
                    label: 'Product',
                    field: 'product',
                    sort: 'asc',
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc',
                },
                {
                    label: 'Type',
                    field: 'type',
                    sort: 'asc',
                },
                {
                    label: 'Employee',
                    field: 'employee',
                    sort: 'asc',
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc',
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc',
                },
            ],
            rows: [],
        };

        OrderDetail?.orderItems?.forEach((order) => {
            const isEditing = editItemId === order._id;
            const employeeSelected = employeeNames?.find(emp => emp.orderItem === order._id);
            console.log(employeeNames)
            console.log(employeeSelected)

            data.rows.push({
                product: (
                    <>
                        <img width="50" src={order.productId?.images[0]?.image} alt="" />
                        <br />
                        <span className='text-secondary' style={{ fontSize: '14px' }}>{order.productId.name}&nbsp;({order.quantity}x)</span>
                    </>
                ),
                price: formatCurrency(order.productId.price),
                type: order.productId?.type,
                employee: (
                    <>
                        {isEditing ? (
                            <select
                                value={employeeId}
                                onChange={(e) => setEmployeeId(e.target.value)}
                            >
                                <option disabled value="">Select</option>
                                {employees.map(emp => (
                                    <option key={emp._id} value={emp._id}>{emp.name}</option>
                                ))}
                            </select>
                        ) : (
                            <span>{employeeSelected ? employeeSelected?.employee.name : 'Select'}</span>
                        )}
                    </>
                ),
                status: (
                    <>
                        {order.status.includes("pending") || order.status.includes("Pending") ? (
                            <span className='text-danger' style={{ fontSize: '14px', fontWeight: '600' }}>{order.status}</span>
                        ) : (
                            <span className='text-success' style={{ fontSize: '14px', fontWeight: '600' }}>{order.status}</span>
                        )}
                    </>
                ),
                actions: (
                    <>
                        {isEditing ? (
                            <button className='btn btn-primary' onClick={() => handleAssignTask(order._id)}>
                                Assign
                            </button>
                        ) : (
                            <button className='btn btn-primary' onClick={() => handleEditClick(order._id)}>
                                <FaEdit />
                            </button>
                        )}
                    </>
                ),
            });
        });

        return data;
    };

    return (
        <div className='container'>
            <div className="row mt-5 d-flex justify-content-between mb-5">
                <div className="col-12 col-lg-12 mb-4 order-confirm">
                    {OrderStatus === 'loading' ? (
                        <div className="d-flex align-items-start justify-content-center">
                            <div className="loader"></div>
                        </div>
                    ) : OrderStatus === 'succeeded' && OrderDetail?.orderItems?.length === 0 ? (
                        <h1>No Orders Placed</h1>
                    ) : (
                        <>
                            <Row className="mt-4">
                                <Col>
                                    <h2>Orders</h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className="table-responsive">
                                        <MDBDataTable
                                            className="px-3"
                                            bordered
                                            striped
                                            hover
                                            style={{ justifyContent: 'center' }}
                                            searching={false}
                                            responsive
                                            data={setOrderDetails()}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </>
                    )}
                </div>
                <div className="col-12 col-lg-6">
                    {OrderDetail && OrderDetail.user && (
                        <div id="order_summary">
                            <h4>{`${OrderDetail.user?.name}'s Details`}</h4>
                            <hr />
                            <table className="table">
                                <tbody>
                                    {OrderDetail.user?.avatar && (
                                        <tr>
                                        <td colSpan="2" className="text-center">
                                            <img
                                                src={OrderDetail.user.avatar}
                                                style={{ borderRadius: '50%' }}
                                                className='border'
                                                alt={OrderDetail.user.name}
                                                width='100'
                                                height='100'
                                            />
                                        </td>
                                    </tr>
                                    )}
                                    <tr>
                                        <td><b>Order ID</b></td>
                                        <td>: {OrderDetail._id}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Order Date</b></td>
                                        <td>: {new Date(OrderDetail.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Total Amount</b></td>
                                        <td>: {OrderDetail.totalPrice}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Name</b></td>
                                        <td>: {OrderDetail.user.name}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Email</b></td>
                                        <td>: {OrderDetail.user.email}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Phone Number</b></td>
                                        <td>: {OrderDetail.user.phoneNumber}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Address</b></td>
                                        <td>: {OrderDetail.user.address}, {OrderDetail.user.city}, {OrderDetail.user.country}, {OrderDetail.user.postalCode}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <hr />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
