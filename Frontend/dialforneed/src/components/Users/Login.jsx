import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import avatarImg from '../../assets/avatar.png';
import "./Login.css";
import { FaRegUserCircle } from "react-icons/fa";
import { IoEyeOutline, IoEyeOffOutline, IoMailOutline } from "react-icons/io5";
import { BsTelephone } from "react-icons/bs";
import { RiHome4Line } from "react-icons/ri";
import { LiaCitySolid } from "react-icons/lia";
import { TbMapPinCode } from "react-icons/tb";
import { SlLocationPin } from "react-icons/sl";
import { useDispatch, useSelector } from 'react-redux';
import { Message, clearError, forgotPassword, loginAuthError, loginAuthStatus, loginAuthUser, loginIsAuthenticated, loginUser, registerUser } from '../../slices/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import MetaData from '../Layouts/MetaData';

const Login = () => {
    const { enqueueSnackbar } = useSnackbar();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()

    const redirect = location.search?'/'+ location.search.split('=')[1]: '/';

    // Sign-in state
    const [signInEmail, setSignInEmail] = useState('');
    const [signInPass, setSignInPass] = useState('');
    const LoginIsAuthenticated = useSelector(loginIsAuthenticated);
    const LoginAuthStatus = useSelector(loginAuthStatus);
    const LoginAuthError = useSelector(loginAuthError);
    const LoginAuthUser = useSelector(loginAuthUser);

    //forgotPassword
    const Mess = useSelector(Message);

    useEffect(() => {
        if (LoginIsAuthenticated) {
            navigate(redirect);
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
    }, [LoginAuthError, LoginIsAuthenticated,  navigate]);

    useEffect(() => {
        if (Mess) {
            enqueueSnackbar(Mess, {
                variant: 'success',
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'center',
                }
              })

            setForgotEmail("")
            return
        }
    }, [Mess, dispatch])


    // Sign-up state
    const [name, setName] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPass, setSignUpPass] = useState('');
    const [number, setNumber] = useState('');
    const [address, setAddress] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState(avatarImg);

    const [signUpMode, setSignUpMode] = useState(true);
    const [showPLogin, setShowPLogin] = useState(false);
    const toggleSignUpMode = () => {
        setSignUpMode(!signUpMode);
    };

    const signUpHandler = (e) => {
        e.preventDefault();
        console.log(name, signUpEmail, signUpPass, number, address, pinCode, city, country, avatar);

        let formData = new FormData();
        formData.append('name', name);
        formData.append('email', signUpEmail);
        formData.append('password', signUpPass);
        formData.append('phoneNumber', number);
        formData.append('address', address);
        formData.append('postalCode', pinCode);
        formData.append('city', city);
        formData.append('country', country);
        formData.append('avatar', avatar);

        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        dispatch(registerUser(formData));
    }

    const signInHandler = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email: signInEmail, password: signInPass }));
    }

    const onChangeFunc = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(e.target.files[0]);
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const [resetPassword, setResetPassword] = useState(false)
    const [forgotEmail, setForgotEmail] = useState('')


    const resetPasswordHandler = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(forgotEmail))
    }


    return (
        <>
        <MetaData title="Login/Registration"/>
            <div className={`login-container ${!signUpMode ? 'sign-up-mode' : ''}`} style={{ marginBottom: window.innerWidth < 870 ? '' : '68px', paddingBottom: window.innerWidth < 870 ? '' : '808px' }}>
                <div className="forms-container ">
                    <div className="signin-signup">
                        {resetPassword ?
                            <form className="sign-in-form" onSubmit={resetPasswordHandler}>
                                <h2 className="title">Reset Password</h2>
                                <div className="input-field d-flex align-items-center"> &nbsp;
                                    <IoMailOutline className='fas' fontSize="1.5rem" />&nbsp;&nbsp;
                                    <input value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} type="text" placeholder="E-mail ID" />
                                </div>
                                <div className='d-flex w-100 align-items-center justify-content-end'>
                                    <a onClick={() => setResetPassword(!resetPassword)}>Sign In</a>
                                </div>
                                {LoginAuthStatus === "loading" ?
                                    <Button variant="primary" className="btn solid" disabled>
                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        Loading...
                                    </Button> :
                                    <Button type="submit" value="Login" className="btn solid">Send Email</Button>
                                }
                            </form>
                            : <form className="sign-in-form" onSubmit={signInHandler}>
                                <h2 className="title">Sign in</h2>
                                <div className="input-field d-flex align-items-center"> &nbsp;
                                    <IoMailOutline className='fas' fontSize="1.5rem" />&nbsp;&nbsp;
                                    <input value={signInEmail} onChange={(e) => setSignInEmail(e.target.value)} type="text" placeholder="E-mail ID" />
                                </div>
                                <div className="input-field d-flex align-items-center">
                                    &nbsp;
                                    <button type='button' style={{ outline: 'none', border: 'none' }} onClick={() => setShowPLogin(!showPLogin)}>
                                        {showPLogin ? <IoEyeOutline className='fas' fontSize="1.5rem" />
                                            : <IoEyeOffOutline className='fas' fontSize="1.5rem" />
                                        }
                                    </button>
                                    &nbsp;&nbsp;
                                    <input value={signInPass} onChange={(e) => setSignInPass(e.target.value)} type={!showPLogin ? "password" : 'text'} placeholder="Password" />
                                </div>
                                <div className='w-100 d-flex align-items-center justify-content-end'>
                                    <a onClick={() => setResetPassword(!resetPassword)}>Forgot Password?</a>
                                </div>

                                {LoginAuthStatus === "loading" ?
                                    <Button variant="primary" className="btn solid" disabled>
                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        Loading...
                                    </Button> :
                                    <Button type="submit" value="Login" className="btn solid">Sign In</Button>
                                }
                            </form>}

                        <form className="sign-up-form " onSubmit={signUpHandler}>
                            <h2 className="title pt-5 ">Sign up</h2>

                            <div className="personal-image">
                                <label className="label">
                                    <input type="file" name="avatar" onChange={onChangeFunc} />
                                    <figure className="personal-figure">
                                        <img src={avatarPreview} className="personal-avatar" alt="avatar" />
                                        <figcaption className="personal-figcaption">
                                            <img src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png" alt="camera icon" />
                                        </figcaption>
                                    </figure>
                                </label>
                            </div>

                            <div className="input-field d-flex align-items-center"> &nbsp;
                                <FaRegUserCircle className='fas' fontSize="1.5rem" />&nbsp;&nbsp;
                                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Username" />
                            </div>
                            <div className="input-field d-flex align-items-center"> &nbsp;
                                <IoMailOutline className='fas' fontSize="1.5rem" />&nbsp;&nbsp;
                                <input value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} type="text" placeholder="E-mail ID" />
                            </div>
                            <div className="input-field d-flex align-items-center">
                                &nbsp;
                                <button type='button' style={{ outline: 'none', border: 'none' }} onClick={() => setShowPLogin(!showPLogin)}>
                                    {showPLogin ? <IoEyeOutline className='fas' fontSize="1.5rem" />
                                        : <IoEyeOffOutline className='fas' fontSize="1.5rem" />
                                    }
                                </button>
                                &nbsp;&nbsp;
                                <input value={signUpPass} onChange={(e) => setSignUpPass(e.target.value)} type={!showPLogin ? "password" : 'text'} placeholder="Password" />
                            </div>
                            <div className="input-field d-flex align-items-center"> &nbsp;
                                <BsTelephone className='fas' fontSize="1.5rem" />&nbsp;&nbsp;
                                <input value={number} onChange={(e) => setNumber(e.target.value)} type="text" placeholder="Phone Number" />
                            </div>

                            <div className="row gx-5 w-100 d-flex justify-content-between">
                                <div className="col-lg-8 col-md-12 col-sm-12 mb-lg-0">
                                    <div className="input-field d-flex align-items-center"> &nbsp;
                                        <RiHome4Line className='fas' fontSize="1.5rem" />&nbsp;&nbsp;
                                        <textarea value={address} onChange={(e) => setAddress(e.target.value)} type="text" placeholder="Address" />
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-12 col-sm-12">
                                    <div className="input-field d-flex align-items-center">
                                        <TbMapPinCode className="fas" fontSize="1.5rem" />&nbsp;&nbsp;
                                        <input value={pinCode} onChange={(e) => setPinCode(e.target.value)} type="number" placeholder="Pincode" />
                                    </div>
                                </div>
                            </div>

                            <div className="row  w-100  d-flex justify-content-between">
                                <div className="col-12 col-lg-6 mb-3">
                                    <div className="input-field d-flex align-items-center">
                                        <LiaCitySolid className="fas" fontSize="1.5rem" />&nbsp;&nbsp;
                                        <input value={city} onChange={(e) => setCity(e.target.value)} type="text" placeholder="City" />
                                    </div>
                                </div>
                                <div className="col-12 col-lg-5">
                                    <div className="input-field d-flex align-items-center">
                                        <SlLocationPin className="fas" fontSize="1.5rem" />&nbsp;&nbsp;
                                        <input value={country} onChange={(e) => setCountry(e.target.value)} type="text" placeholder="Country" />
                                    </div>
                                </div>
                            </div>
                            

                            {LoginAuthStatus === "loading" ?
                                <Button variant="primary" className="btn solid" disabled>
                                    <Spinner
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    Loading...
                                </Button> :
                                <Button type="submit" value="Login" className="  btn solid">Sign Up</Button>
                            }
                        </form>
                    </div>
                </div>

                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>New here ?</h3>
                            <p>
                                Sign up today and unlock a world of exclusive deals, and much more. Join our community of happy shoppers now!
                            </p>
                            <button className="btn transparent" onClick={toggleSignUpMode} id="sign-up-btn">
                                Sign up
                            </button>
                        </div>
                        <img src="https://i.ibb.co/6HXL6q1/Privacy-policy-rafiki.png" className="image" alt="" />
                    </div>
                    <div className="panel right-panel">
                        <div className="content">
                            <h3>One of us ?</h3>
                            <p>
                                Welcome back! If you already have an account, login to continue enjoying our personalized shopping experience and exclusive member benefits.
                            </p>
                            <button className="btn transparent" onClick={toggleSignUpMode} id="sign-in-btn">
                                Sign in
                            </button>
                        </div>
                        <img src="https://i.ibb.co/nP8H853/Mobile-login-rafiki.png" className="image" alt="" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
