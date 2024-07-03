import React from 'react'
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { MDBDataTable } from 'mdbreact';
import { IoIosAddCircle } from "react-icons/io";
import { useSnackbar } from 'notistack';
import { Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ClearIsCreated, ClearIsDeleted, ClearTaskError, Error, IsCreated, IsDeleted, Status, Task, TasksData, createTask, deleteTask, fetchTaskByID, fetchTasks } from '../../slices/TaskSlice';
import { Link } from 'react-router-dom';
import { EmployeesData, fetchEmployees } from '../../slices/EmployeeSlice';
import { FaRegEye } from 'react-icons/fa';

const TaskList = () => {
    const [modalShow, setModalShow] = React.useState(false)
    const tasks = useSelector(TasksData);
    const singleTask = useSelector(Task);
    const [editItemId, setEditItemId] = useState(null);
    const [employeeId, setEmployeeId] = useState('');
    const employees = useSelector(EmployeesData);

    const status = useSelector(Status);
    const error = useSelector(Error);
    //const isCreated = useSelector(IsCreated);
    const isDeleted = useSelector(IsDeleted);
    //const isUpdated = useSelector(IsUpdated);

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    // const [isUpdateButton, setIsUpdateButton] = useState(false)
    const taskCreated = useSelector(IsCreated);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(ClearTaskError());
            
        }

        if (isDeleted) {
            enqueueSnackbar("Task Deleted", { variant: 'success' ,  
            anchorOrigin: {
               vertical: 'top',
               horizontal: 'center',
             }});
            dispatch(ClearIsDeleted()); // Make sure to clear the isUpdated flag
            dispatch(fetchTasks());
            return
        }

        if (taskCreated) {
            enqueueSnackbar("Task Updated Successfully!", {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
                onExited: () => {
                    dispatch(ClearIsCreated());
                },
            });
            dispatch(fetchTasks());
            return
        }

        dispatch(fetchTasks());

    }, [dispatch, error, taskCreated, enqueueSnackbar, isDeleted]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this Task?')) {
            dispatch(deleteTask(id));
        }
    }

    const handleAssignTask = (id, orderItemId) => {
        const taskData = { id, taskData: { orderItemId, employeeId } };
        dispatch(createTask(taskData));
        console.log(taskData)
        setEditItemId(null);
        setEmployeeId('');
    };

    const handleEditClick = (itemId) => {
        dispatch(fetchEmployees());
        setEditItemId(itemId);
    };




    const handleViewTask = (id) => {
        setModalShow(true)
        dispatch(fetchTaskByID(id))
    }


    const setTasks = () => {
        const data = {
            columns: [
                { label: 'User', field: 'user', sort: 'asc' },
                { label: 'Product', field: 'product', sort: 'asc' },
                { label: 'Employee', field: 'employee', sort: 'asc' },
                { label: 'Status', field: 'status', sort: 'asc' },
                { label: 'Actions', field: 'actions', sort: 'asc' },
            ],
            rows: [],
        };

        tasks?.forEach((task) => {
            const isEditing = editItemId === task._id;

            data.rows.push({
                user: <>
                    {task?.order?.user?.name}
                    <br />
                    <span className='text-secondary' style={{ fontSize: '14px' }}>({task?.order?.user?.phoneNumber})</span>
                </>,
                product: <Link to={`/product/${task?.orderItem?.productId?._id}`} style={{ color: 'unset', textDecoration: 'underline' }}> {task?.orderItem?.productId?.name}  </Link>,
                status: task?.orderItem?.status,
                employee: <>
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
                    )
                        :
                        <>{task?.employee?.name}
                            <br />
                            <span className='text-secondary' style={{ fontSize: '14px' }}>({task?.employee?.phoneNumber})</span>
                        </>}
                </>,
                actions: <div className='d-flex gap-2'>
                    <button onClick={(e) => handleViewTask(task._id)} className='btn btn-primary'>
                        <FaRegEye />
                    </button> &nbsp; &nbsp;
                    {isEditing ? (
                        <>  <button className='btn btn-primary' onClick={() => handleAssignTask(task?.order._id, task?.orderItem._id)}>
                            Assign
                        </button>  &nbsp; &nbsp;
                            <button className='btn btn-danger' onClick={() => setEditItemId(null)}>
                                Cancel
                            </button> </>
                    ) : (
                        <button className='btn btn-primary' onClick={() => handleEditClick(task._id)}>
                            <FaEdit />
                        </button>
                    )} &nbsp; &nbsp;

                    <button onClick={(e) => handleDelete(task._id)} className='btn btn-danger'>
                        <FaTrashAlt />
                    </button>

                </div>,

            });
        });

        return data;
    };

    const handleClose = () => {
        setModalShow(false)
    }

    console.log(singleTask)
    return (
        <div>
            <div>
                <h2>Tasks</h2>
            </div>
            {status === 'loading' ? (
                <div className="d-flex align-items-start justify-content-center">
                    <div className="loader"></div>
                </div>
            ) : status === 'succeeded' && tasks && tasks.length === 0 ? (
                <h6 className='mt-3'>No Tasks Placed</h6>
            ) : (
                <>
                    <Row>
                        <Col>
                            <div className="table-responsive">
                                <MDBDataTable
                                    className="px-3"
                                    bordered
                                    striped
                                    hover
                                    searching={false}
                                    responsive
                                    data={setTasks()}
                                />
                            </div>
                        </Col>
                    </Row></>
            )}
            <Modal
                show={modalShow}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                {singleTask &&
                    <>  <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {singleTask.order.user.name}'s Order
                        </Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Col className="col-12 mt-3 col-lg-12">
                                    <div id="order_summary">
                                        <h4>Product Details</h4>
                                        <hr />
                                        <table className="table">
                                            <tbody>
                                                {singleTask.orderItem.productId.images && <tr  >
                                                  
                                                    <td ><img width="100" src={singleTask.orderItem.productId?.images[0]?.image} alt="" /> </td>
                                                  
                                                </tr>}
                                                <tr>
                                                    <td><b>Product Name</b></td>
                                                    <td>{singleTask.orderItem.productId.name}</td>
                                                </tr>
                                                <tr>
                                                    <td><b>Product Price</b></td>
                                                    <td>: {singleTask.orderItem.productId.price}</td>
                                                </tr>
                                                <tr>
                                                    <td><b>Quantity</b></td>
                                                    <td>: {singleTask.orderItem.quantity}</td>
                                                </tr>
                                                <tr>
                                                    <td><b>Product Status</b></td>
                                                    <td>: {singleTask.orderItem.status.includes("pending") || singleTask.orderItem.status.includes("Pending")
                                                        ? <span style={{ color: 'red' }}>{singleTask.orderItem.status}</span> : <span style={{ color: 'green' }}>{singleTask.orderItem.status}</span>}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <hr />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="col-12 col-lg-12 mt-3">
                                    <div id="order_summary">
                                        <h4>{`${singleTask.order.user.name}'s Details`}</h4>
                                        <hr />
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <td><b>Order ID</b></td>
                                                    <td>: {singleTask.order._id}</td>
                                                </tr>
                                                <tr>
                                                    <td><b>Name</b></td>
                                                    <td>: {singleTask.order.user.name}</td>
                                                </tr>
                                                <tr>
                                                    <td><b>Email</b></td>
                                                    <td>: {singleTask.order.user.email}</td>
                                                </tr>
                                                <tr>
                                                    <td><b>Phone Number</b></td>
                                                    <td>: {singleTask.order.user.phoneNumber}</td>
                                                </tr>
                                                <tr>
                                                    <td><b>Order Date</b></td>
                                                    <td>: {new Date(singleTask.order.paidAt).toLocaleDateString()}</td>
                                                </tr>
                                                <tr>
                                                    <td><b>Total Amount</b></td>
                                                    <td>: {singleTask.orderItem.productId.price * singleTask.orderItem.quantity}</td>
                                                </tr>

                                                <tr>
                                                    <td><b>Address</b></td>
                                                    <td>: {singleTask.order.user.address}, {singleTask.order.user.city}, {singleTask.order.user.postalCode}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <hr />
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col className="col-12 mt-3 col-lg-12">
                                    <div id="order_summary">
                                        <h4>{`${singleTask.employee.name}'s Details`}</h4>
                                        <hr />
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <td><b>Name</b></td>
                                                    <td>: {singleTask.employee.name}</td>
                                                </tr>
                                                <tr>
                                                    <td><b>Employee Type</b></td>
                                                    <td>: {singleTask.employee.employeeType}</td>
                                                </tr>
                                                <tr>
                                                    <td><b>Email</b></td>
                                                    <td>: {singleTask.employee.email}</td>
                                                </tr>
                                                <tr>
                                                    <td><b>Phone Number</b></td>
                                                    <td>: {singleTask.employee.phoneNumber}</td>
                                                </tr>

                                            </tbody>
                                        </table>
                                        <hr />
                                    </div>
                                </Col>
                            </Row>


                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="button" className="btn btn-danger" onClick={() => setModalShow(false)}>Close</Button>
                        </Modal.Footer>
                    </>
                }
            </Modal>
        </div>
    )
}

export default TaskList