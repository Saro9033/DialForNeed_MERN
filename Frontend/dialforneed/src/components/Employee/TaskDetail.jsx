import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ClearIsRequested, ClearTaskError, Error, IsRequested, Status, Task, employeeRequested, fetchTaskByID } from '../../slices/TaskSlice';
import { useSnackbar } from 'notistack';
import { Row, Col } from 'react-bootstrap';
import MetaData from '../../components/Layouts/MetaData';

export const TaskDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const task = useSelector(Task);
    const error = useSelector(Error);
    const status = useSelector(Status);
    const { enqueueSnackbar } = useSnackbar();
    const isRequested = useSelector(IsRequested);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error.toString(), {
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
        if (isRequested) {
            enqueueSnackbar("Requested", {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
            });
            dispatch(ClearIsRequested());
        }

        dispatch(fetchTaskByID(id));
    }, [dispatch, error, enqueueSnackbar, isRequested, id]);

    if (status === 'loading' || !task || !task.orderItem || !task.order) {
        return (
            <div className="d-flex align-items-start justify-content-center">
                <div className="loader"></div>
            </div>
        );
    }

    const handleRequested = async (e, id) => {
        e.preventDefault();
        dispatch(employeeRequested(id));
    };

    return (
        <div>
            <MetaData title={`${task?.orderItem?.productId?.name} Details`} />

            <Row className="mt-3">
                <Col lg={8} md={12} sm={12}>
                    <div className="table-responsive mb-4 border rounded-3 p-2">
                        <h4 className="mb-3">Product Details</h4>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td><img width="80" height="80" src={task?.orderItem?.productId?.images[0]?.image} alt="" /></td>
                                    <td colSpan="2"></td>
                                </tr>
                                <tr>
                                    <td><b>Name</b></td>
                                    <td>:&nbsp;&nbsp;&nbsp;{task?.orderItem?.productId?.name}</td>
                                </tr>
                                <tr>
                                    <td><b>Description</b></td>
                                    <td>:&nbsp;&nbsp;&nbsp;{task?.orderItem?.productId?.description}</td>
                                </tr>
                                <tr>
                                    <td><b>Price</b></td>
                                    <td>:&nbsp;&nbsp;&nbsp;{task?.orderItem?.productId?.price}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="table-responsive mb-4 border rounded-3 p-2">
                        <h4 className="mb-3">Order Details</h4>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td><b>Quantity</b></td>
                                    <td>:&nbsp;&nbsp;&nbsp;{task?.orderItem?.quantity}</td>
                                </tr>
                                <tr>
                                    <td><b>Status</b></td>
                                    <td>:&nbsp;&nbsp;&nbsp;
                                        {task?.orderItem?.status.includes("pending") || task?.orderItem?.status.includes("Pending") ? (
                                            <span className='text-danger' style={{ fontSize: '14px', fontWeight: '600' }}>{task?.orderItem?.status}</span>
                                        ) : (
                                            <span className='text-success' style={{ fontSize: '14px', fontWeight: '600' }}>{task?.orderItem?.status}</span>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Col>
                <Col lg={4} md={12} sm={12}>
                    <div className="table-responsive mb-4 border rounded-3 p-2">
                        <div className='d-flex align-items-center justify-content-between'>
                            <h4 className="mb-3">User Details</h4>
                            <button type="button" onClick={(e) => handleRequested(e, task?.orderItem?._id)} className={`btn ${task?.orderItem?.isRequested ? 'btn-outline-primary' : 'btn-primary'}`} style={{ fontSize: '16px', padding: "3px 6px" }}>{task?.orderItem?.isRequested ? 'Requested' : 'Send Request'}</button>
                        </div>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td><b>Name</b></td>
                                    <td>:&nbsp;&nbsp;&nbsp;&nbsp;{task?.order?.user?.name}</td>
                                </tr>
                                <tr>
                                    <td><b>Email</b></td>
                                    <td>:&nbsp;&nbsp;&nbsp;&nbsp;{task?.order?.user?.email}</td>
                                </tr>
                                <tr>
                                    <td><b>Phone Number</b></td>
                                    <td>:&nbsp;&nbsp;&nbsp;&nbsp;{task?.order?.user?.phoneNumber}</td>
                                </tr>
                                <tr>
                                    <td><b>Address</b></td>
                                    <td>:&nbsp;&nbsp;&nbsp;&nbsp;{task?.order?.user?.address}, {task?.order?.user?.city}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="table-responsive mb-4 border rounded-3 p-2">
                        <h4 className="mb-3">Total Cost</h4>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td><b>{`1 ${task?.orderItem?.productId?.name}`}</b></td>
                                    <td>=&nbsp;&nbsp;{task?.orderItem?.productId?.price}</td>
                                </tr>
                                <tr>
                                    <td><b>{`(${task?.orderItem?.quantity}x) ${task?.orderItem?.productId?.name}`}</b></td>
                                    <td>=&nbsp;&nbsp;{task?.orderItem?.quantity * task?.orderItem?.productId?.price}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default TaskDetail;
