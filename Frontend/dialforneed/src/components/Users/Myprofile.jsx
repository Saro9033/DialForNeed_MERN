import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { clearError, clearUpdated, editUser, isUpdated, loginAuthError, loginAuthUser, loginIsAuthenticated } from '../../slices/authSlice';
import avatarImg from '../../assets/avatar.png';
import './MyProfile.css'
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import MetaData from '../Layouts/MetaData';
import { BiArrowBack } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa6";

const Myprofile = () => {
    const { enqueueSnackbar } = useSnackbar();

    const user = useSelector(loginAuthUser);
    const IsUpdated = useSelector(isUpdated);
    const LoginAuthError = useSelector(loginAuthError)
    const isMobileView = window.innerWidth < 850;
    const LoginIsAuthenticated = useSelector(loginIsAuthenticated)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //updating profile
    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [address, setAddress] = useState(user?.address);
    const [number, setNumber] = useState(user?.phoneNumber);

    const [postalCode, setPostalCode] = useState(user?.postalCode);
    const [city, setCity] = useState(user?.city);
    const [country, setCountry] = useState(user?.country);
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(user?.avatar);

    const dispatch = useDispatch()

    const onChangeAvatar = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0]; // Get the selected file

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result); // Set avatar preview for display
                setAvatar(file); // Set avatar file for form data
            }
        }
        if (file) {
            reader.readAsDataURL(file); // Read the selected file
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phoneNumber', number);
        formData.append('address', address);
        formData.append('postalCode', postalCode);
        formData.append('city', city);
        formData.append('country', country);
        formData.append('avatar', avatar);
        dispatch(editUser(formData));
    }

    const navigate = useNavigate()
    useEffect(() => {
        if (IsUpdated) {
            enqueueSnackbar("Profile updated successfully!", {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
                onExited: () => {
                    dispatch(clearUpdated());
                },
            })
            return
        }
        if (LoginAuthError) {
            enqueueSnackbar(LoginAuthError, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
                onExited: () => {
                    dispatch(clearError());
                },
            })
            return
        }
        if (!LoginIsAuthenticated && user?.role === "user" || !LoginIsAuthenticated && user?.role === "employee") {
            console.log(LoginIsAuthenticated)
            navigate('/')
        }
    }, [IsUpdated, user, LoginAuthError, LoginIsAuthenticated, dispatch, enqueueSnackbar, navigate])

    return (<>
        <div className='d-block  d-md-none mt-3'>
            <div className='d-flex align-items-center border-bottom pb-4'>
                <div> <div className=' border d-inline pt-1 pb-2 px-2' style={{ borderRadius: '50%' }}>
                    <BiArrowBack fontSize="1.3rem" />
                </div> </div> &nbsp; &nbsp; &nbsp; &nbsp;
                <h5 className='m-0'>Settings</h5>
            </div>

            <div className='pt-4 d-flex align-items-center'>
                <FaRegUser fontSize="1.3rem" />&nbsp; &nbsp;
                <h5 className='m-0'>Account Setting</h5>
            </div>
            <div className='w-100 d-flex flex-column align-items-center justify-content-center mt-3'>
                <img src={user?.avatar || avatarImg} alt={user?.name} style={{ objectFit: 'cover', width: '80px', height: '80px' }} class="border rounded-circle p-1 bg-primary" />
                {user?.role !== "employee" ?
                    <div className='d-flex w-100 align-items-center justify-content-around'>
                        <Link to='/my-orders' className="d-inline mt-2 btn border bg-success text-white">Orders</Link>
                    </div> :
                    <div className='d-flex w-100 align-items-center justify-content-around'>
                        <Link to='/my-tasks' className="w-100 mt-2 btn outline-secondary">Tasks</Link>
                    </div>
                }
            </div>
            <div className='pt-4 d-flex align-items-center justify-content-between'>
                <div>
                    <h6 style={{ fontSize: '17px' }} className='mb-2'>Email</h6>
                    <span className='m-0'>{user?.email}</span>
                </div>
                <button onClick={handleShow} className='btn bg-transparent' style={{ border: '1px solid black' }}><b>Change</b></button>
            </div>
            <div className='pt-4 d-flex align-items-center justify-content-between'>
                <div>
                    <h6 style={{ fontSize: '17px' }} className='mb-2'>Phone Number</h6>
                    <span className='m-0'>{user?.phoneNumber}</span>
                </div>
                <button onClick={handleShow} className='btn bg-transparent' style={{ border: '1px solid black' }}><b>Change</b></button>
            </div>
            <div className='pt-4 d-flex align-items-center justify-content-between'>
                <div>
                    <h6 style={{ fontSize: '17px' }} className='mb-2'>Address</h6>
                    <span className='m-0'>{user?.address}, {user?.city}, {user?.country}, {user?.postalCode} </span>
                </div>
                <button onClick={handleShow} className='btn bg-transparent' style={{ border: '1px solid black' }}><b>Change</b></button>
            </div>
        </div>



        <div class="container " style={{ marginTop: isMobileView ? '15px' : '10px', }}>
            <MetaData title="My profile" />
            <div class="main-body d-none d-md-block">
                <div class="row">
                    <div class={`${user?.role === "employee" ? 'col-lg-12' : 'col-lg-4'}`} >
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex flex-column align-items-center text-center">
                                    <img src={user?.avatar || avatarImg} alt="Admin" style={{ objectFit: 'cover', width: '100px', height: '100px' }} class="rounded-circle p-1 bg-primary" />
                                    <div class="mt-3">
                                        <h4>{user?.name}</h4>
                                        <p class="text-secondary mb-1">{user?.email}</p>
                                        {user?.role === "employee" && <p class="text-secondary mb-1">{user?.phoneNumber}</p>}
                                        {user?.role !== "employee" ?
                                            <div className='d-flex w-100 align-items-center justify-content-around'>
                                                <Link to='/my-orders' className="w-100 mt-2 btn btn-outline-primary">Orders</Link>
                                            </div> :
                                            <div className='d-flex w-100 align-items-center justify-content-around'>
                                                <Link to='/my-tasks' className="w-100 mt-2 btn btn-outline-primary">Tasks</Link>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <hr class="my-4" />

                            </div>
                        </div>
                    </div>
                    {user?.role !== "employee" && <div class="col-lg-8">
                        <div class="card">
                            <div class="card-body">

                                <div class="row mb-3">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Phone</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        <input type="text" class="form-control" value={user?.phoneNumber} />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Address</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        <input type="text" class="form-control" value={user?.address} />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Postal Code</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        <input type="text" class="form-control" value={user?.postalCode} />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">City</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        <input type="text" class="form-control" value={user?.city} />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Country</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        <input type="text" class="form-control" value={user?.country} />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-3"></div>
                                    <div class="col-sm-9 text-secondary">
                                        <button onClick={handleShow} class="btn btn-primary px-4" >Edit Profile</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>}
                </div>
            </div>
        </div>




        <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Form onSubmit={submitHandler}>
                <Modal.Body>

                <div className="personal-image">
                            <label className="label">
                                <input type="file" name="avatar" onChange={onChangeAvatar} />
                                <figure className="personal-figure">
                                    <img src={avatarPreview} className="personal-avatar" alt="Avatar Preview" />
                                    <figcaption className="personal-figcaption">
                                        <img src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png" alt="camera icon" />
                                    </figcaption>
                                </figure>
                            </label>
                        </div>
                    <Form.Group controlId="formName" >
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control onChange={(e) => setName(e.target.value)} type="text" value={name} />
                    </Form.Group> <br />
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" value={email} />
                    </Form.Group> <br />
                    <Form.Group controlId="formPhoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control onChange={(e) => setNumber(e.target.value)} type="text" value={number} />
                    </Form.Group> <br />
                    <Form.Group controlId="formAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control onChange={(e) => setAddress(e.target.value)} type="text" value={address} />
                    </Form.Group> <br />
                    <Form.Group controlId="formPostalCode">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control onChange={(e) => setPostalCode(e.target.value)} type="text" value={postalCode} />
                    </Form.Group> <br />
                    <Form.Group controlId="formCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control onChange={(e) => setCity(e.target.value)} type="text" value={city} />
                    </Form.Group> <br />
                    <Form.Group controlId="formCountry">
                        <Form.Label>Country</Form.Label>
                        <Form.Control onChange={(e) => setCountry(e.target.value)} type="text" value={country} />
                    </Form.Group> <br />

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type='submit' onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>

    </>

    );
}

export default Myprofile

