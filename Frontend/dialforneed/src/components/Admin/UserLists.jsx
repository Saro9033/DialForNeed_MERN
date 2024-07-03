import React, { useEffect, useState } from 'react'
import { ClearUserError, allUsers, clearSingleUser, fetchSingleUser, fetchUsers, singleUser, userError, userStatus } from '../../slices/AdminUserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Row, Col } from 'react-bootstrap';
import { MDBDataTable } from 'mdbreact';
import { FaRegEye } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';

const UserLists = () => {
    const AllUsers = useSelector(allUsers);
    const SingleUser = useSelector(singleUser);
    const UserError = useSelector(userError);
    const UserStatus = useSelector(userStatus);

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (UserError) {
            enqueueSnackbar(UserError, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
                onExited: () => {
                    dispatch(ClearUserError());
                },
            });
            return
        }
        dispatch(fetchUsers());
    }, [dispatch, UserError, enqueueSnackbar]);

    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'Register on',
                    field: 'loggedIn',
                    sort: 'asc',
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc',
                },

                {
                    label: 'Phone Number',
                    field: 'number',
                    sort: 'asc',
                },
                {
                    label: 'Role',
                    field: 'type',
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

        AllUsers.forEach((user) => {
            data.rows.push({
                loggedIn: new Date(user.createdAt).toLocaleDateString(),
                name: user.name,
                number: user.phoneNumber,
                type: user.role,
                actions: (
                    <button onClick={(e) => handleSeeUser(e, user._id)} className='btn btn-primary'>
                        <FaRegEye />
                    </button>
                ),
            });
        });

        return data; // Return the data object
    };

    const [modalShow, setModalShow] = useState(false)

    const handleSeeUser = (e, id) => {
        e.target.disabled = true;
        setModalShow(true)
        dispatch(fetchSingleUser(id))
    }

    const handleClose = () => {
        setModalShow(false)
        dispatch(clearSingleUser())
    }

    return (
        <div>
            {UserStatus === 'loading' ? (
                <div className="d-flex align-items-start justify-content-center">
                    <div className="loader"></div>
                </div>
            ) : UserStatus === 'succeeded' && AllUsers.length === 0 ? (
                <h1>No User Placed</h1>
            ) : (
                <>
                    <Row className="mt-4">
                        <Col>
                            <h2>All Users</h2>
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
                                    searching={false}
                                    responsive // This makes the table responsive
                                    data={setUsers()}
                                />
                            </div>
                        </Col>
                    </Row>
                </>
            )}



            <Modal
                show={modalShow}
                onHide={handleClose}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {SingleUser?.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {UserStatus === 'loading' ? (
                        <div className="d-flex align-items-start justify-content-center">
                            <div className="loader"></div>
                        </div>
                    ) : (
                        <>
                            <div>
                                {SingleUser && <>
                                    {SingleUser.avatar ? <div className='d-flex align-items-center justify-content-center'>
                                        <img width="120" height="120" className="rounded-circle border" src={SingleUser?.avatar} alt="" />
                                    </div> : ''


                                    }
                                    <table className="mt-4 w-100 table">
                                        <tbody >
                                            <tr>
                                                <td><b>Name</b></td>
                                                <td>:&nbsp;&nbsp;&nbsp;&nbsp;{SingleUser?.name}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Email</b></td>
                                                <td>:&nbsp;&nbsp;&nbsp;&nbsp;{SingleUser?.email}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Phone Number</b></td>
                                                <td>:&nbsp;&nbsp;&nbsp;&nbsp;{SingleUser?.phoneNumber}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Address</b></td>
                                                <td>:&nbsp;&nbsp;&nbsp;&nbsp;{SingleUser?.address}, {SingleUser?.city}, {SingleUser?.country}, {SingleUser?.postalCode}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </>
                                }
                            </div>
                        </>
                    )}

                </Modal.Body>
            </Modal>
        </div >
    )
}

export default UserLists