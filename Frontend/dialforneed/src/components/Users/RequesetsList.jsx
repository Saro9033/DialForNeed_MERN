import React, { useEffect, useState } from 'react';
import MetaData from '../Layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { ClearRequestReply, ClearTaskError, Error, Status, getRequestsByUser, requestReply, requestsReplyState, userRequests } from '../../slices/TaskSlice';
import { useSnackbar } from 'notistack';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Table } from 'react-bootstrap';

const RequestsList = () => {
    const UserRequests = useSelector(userRequests);
    const dispatch = useDispatch();
    const error = useSelector(Error);
    const status = useSelector(Status);
    const { enqueueSnackbar } = useSnackbar();
    const RequestsReply = useSelector(requestsReplyState);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                }
            });
            dispatch(ClearTaskError());
        } else if (RequestsReply) {
            enqueueSnackbar("Status Updated!", {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                }
            });
            dispatch(ClearRequestReply());
            dispatch(getRequestsByUser());

        }
    }, [dispatch, error, enqueueSnackbar, RequestsReply]);

    useEffect(() => {
        dispatch(getRequestsByUser());
    }, [dispatch]);

    const [modalShow, setModalShow] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    const handleModalOpen = (req) => {
        setSelectedRequest(req);
        setModalShow(true);
    };

    const handleCloseModal = () => {
        setModalShow(false);
    };

    const handleSubmit = (e, id, statusValue) => {
        e.preventDefault();
        dispatch(requestReply({ id, status: statusValue }));
    };

    if (status === 'loading' || UserRequests === null) {
        return (
            <div className="d-flex align-items-start justify-content-center">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <div>
            <MetaData title="Employee Requests" />
            {UserRequests.length === 0 ? (
                <p>No Requests</p>
            ) : (
                <ul style={{ listStyleType: 'none' }} className='m-0 p-0'>
                    {UserRequests.map((req) => (
                        <li key={req._id} className='p-2 my-2 rounded-2 shadow-sm border d-flex align-items-center justify-content-between'>
                            <div style={{cursor:'pointer'}} className='w-100 d-flex align-items-center' onClick={() => handleModalOpen(req)}>
                                <img src={req.productId?.images[0]?.image} width="50" height="50" style={{ borderRadius: '50%' }} className="border" alt="" />
                                <div className='d-flex flex-column pl-2'>
                                    <h6 style={{ fontSize: '13px' }} className='m-0'>{req.productId?.name || 'Product Not Found' }</h6>
                                    <p style={{ fontSize: '13px' }} className='m-0 text-secondary'>{req.productId?.description.slice(0, 20)}</p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    {req.status.includes("pending") || req.status.includes("Pending") ? (
                                        ""
                                    ) : (
                                        <span className='text-success' style={{ fontSize: '14px', fontWeight: '600' }}>{req.status}</span>
                                    )}
                                </div>
                                {(req.status === "pending" || req.status === "Pending") && (
                                    <div>
                                        <button onClick={(e) => handleSubmit(e, req._id, true)} className='btn btn-success' style={{ fontSize: '10px', fontWeight: '600', padding: '3px 6px' }}>Completed</button>
                                        <br />
                                        <button onClick={(e) => handleSubmit(e, req._id, false)} className='btn btn-danger' style={{ fontSize: '10px', fontWeight: '600', padding: '3px 6px' }}>Not Completed</button>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <Modal
                show={modalShow}
                onHide={handleCloseModal}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {selectedRequest && selectedRequest.productId?.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex align-items-center justify-content-center'>
                        <img width='80' height="80" src={selectedRequest?.productId?.images[0]?.image} alt="" />
                    </div>
                    <Table responsive borderless>
                        <tbody>
                            <tr>
                                <td style={{ width: '150px' }}><span style={{ fontWeight: '700' }}>Product Name:</span></td>
                                <td><p className='m-0'>{selectedRequest && selectedRequest.productId?.name || "Product Not Found"}</p></td>
                            </tr>
                            <tr>
                                <td style={{ width: '150px' }}><span style={{ fontWeight: '700' }}>Description:</span></td>
                                <td>{selectedRequest?.productId?.description}</td>
                            </tr>
                            <tr>
                                <td style={{ width: '150px' }}><span style={{ fontWeight: '700' }}>Price:</span></td>
                                <td>{selectedRequest?.productId?.price}</td>
                            </tr>
                            <tr>
                                <td style={{ width: '150px' }}><span style={{ fontWeight: '700' }}>Status:</span></td>
                                <td>{selectedRequest?.status}</td>
                            </tr>
                            <tr>
                                <td style={{ width: '150px' }}><span style={{ fontWeight: '700' }}>Quantity:</span></td>
                                <td>{selectedRequest?.quantity}</td>
                            </tr>
                            <tr>
                                <td style={{ width: '150px' }}><span style={{ fontWeight: '700' }}>Brand:</span></td>
                                <td>{selectedRequest?.productId?.brandId?.title}</td>
                            </tr>
                            <tr>
                                <td style={{ width: '150px' }}><span style={{ fontWeight: '700' }}>Category:</span></td>
                                <td>{selectedRequest?.productId?.categoryId?.title}</td>
                            </tr>
                            <tr>
                                <td style={{ width: '150px' }}><span style={{ fontWeight: '700' }}>Type:</span></td>
                                <td>{selectedRequest?.productId?.type}</td>
                            </tr>
                            <tr>
                                <td style={{ width: '150px' }}><span style={{ fontWeight: '700' }}>Total Amount:</span></td>
                                <td><b> {selectedRequest?.productId?.price * selectedRequest?.quantity}</b></td>
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    {(selectedRequest?.status === "pending" || selectedRequest?.status === "Pending") && (
                        <>
                            <button onClick={(e) => handleSubmit(e, selectedRequest?._id, true)} className='btn btn-success' style={{ fontSize: '10px', fontWeight: '600', padding: '3px 6px' }}>Completed</button>
                            &nbsp;&nbsp;
                            <button onClick={(e) => handleSubmit(e, selectedRequest?._id, false)} className='btn btn-danger' style={{ fontSize: '10px', fontWeight: '600', padding: '3px 6px' }}>Not Completed</button>
                        </>
                    )}
                    <Button onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default RequestsList;
