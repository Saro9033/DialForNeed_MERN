import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { clearError, clearPasswordReseted, loginAuthError, loginAuthStatus, loginIsAuthenticated, passwordResetted, resetPassword } from '../../slices/authSlice'
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner'
import { useSnackbar } from 'notistack';

const ResetPassword = () => {
    const [pass, setPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const { token } = useParams()
    const dispatch = useDispatch()
    const LoginIsAuthenticated = useSelector(loginIsAuthenticated);
    const LoginAuthStatus = useSelector(loginAuthStatus);
    const LoginAuthError = useSelector(loginAuthError);
    const PasswordResetted = useSelector(passwordResetted)
    const { enqueueSnackbar } = useSnackbar();

    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)

    const submitForm = (e) => {
        e.preventDefault();
        const obj = {
            password: pass,
            confirmPassword: confirmPass,
            token: token // Ensure token is passed here
        };
        dispatch(resetPassword(obj));
    };


    const navigate = useNavigate()
    useEffect(() => {
        if (PasswordResetted) {
            enqueueSnackbar("Password Reset Successfully", {
                variant: 'success',
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'center',
                }
              })
              dispatch(clearPasswordReseted())
            navigate('/')
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
    },[LoginIsAuthenticated,LoginAuthError, dispatch, navigate ])

    return (
        <div className=" d-flex align-items-center justify-content-center w-100" style={{ minHeight: '100vh' }}>
            <div className="row wrapper w-100">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitForm}>
                        <h1 className="mb-3">New Password</h1>

                        <div className=" py-4 form-control input-field d-flex align-items-center">
                            &nbsp;
                            <button type='button' style={{ outline: 'none', border: 'none' }} onClick={() => setShow1(!show1)}>
                                {show1 ? <IoEyeOutline className='fas' fontSize="1.5rem" />
                                    : <IoEyeOffOutline className='fas' fontSize="1.5rem" />
                                }
                            </button>
                            &nbsp;&nbsp;
                            <input className='form-control ' style={{border:'none', outline:'none'}} value={pass} onChange={(e) => setPass(e.target.value)} type={!show1 ? "password" : 'text'} placeholder="Password" />
                        </div>

                        <div className=" py-4 form-control mt-4 input-field d-flex align-items-center">
                            &nbsp;
                            <button type='button' style={{ outline: 'none', border: 'none' }} onClick={() => setShow2(!show2)}>
                                {show2 ? <IoEyeOutline className='fas' fontSize="1.5rem" />
                                    : <IoEyeOffOutline className='fas' fontSize="1.5rem" />
                                }
                            </button>
                            &nbsp;&nbsp;
                            <input className='form-control '  style={{border:'none', outline:'none'}} value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} type={!show2 ? "password" : 'text'} placeholder="Confirm Password" />
                        </div>

                        {LoginAuthStatus === "loading" ?
                            <Button variant="primary" className="w-100 btn solid" disabled>
                                <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                Loading...
                            </Button> :
                            <Button   type="submit" value="Login" className="w-100 btn solid">Set Password</Button>
                        }

                    </form>
                </div>
            </div>

        </div>

    )
}

export default ResetPassword