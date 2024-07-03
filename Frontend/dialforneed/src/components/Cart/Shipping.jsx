import React, { useState } from 'react'
import CheckOutSteps from './CheckOutSteps'
import { editUser, loginAuthUser } from '../../slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Shipping = () => {
    const LoginAuthUser = useSelector(loginAuthUser)
    console.log(LoginAuthUser)

    const [address, setAddress] = useState(LoginAuthUser.country);
    const [pinCode, setPinCode] = useState(LoginAuthUser.postalCode);
    const [city, setCity] = useState(LoginAuthUser.city);
    const [country, setCountry] = useState(LoginAuthUser.country);
    const [number, setNumber] = useState(LoginAuthUser.phoneNumber);

const dispatch = useDispatch()
const navigate = useNavigate()
    const submitHandler = (e) =>{
        e.preventDefault();
        let formData = new FormData();
        formData.append('phoneNumber', number);
        formData.append('address', address);
        formData.append('postalCode', pinCode);
        formData.append('city', city);
        formData.append('country', country);
        dispatch(editUser(formData));

        navigate('/confirmOrder')
    }

    return (
        <>
            <div className='container' style={{ minHeight: '100vh' }}>
                <CheckOutSteps shipping={true} />
                <div className="row wrapper pb-5">
                    <div className="col-12 col-lg-5 p-0">
                        <form className="" onSubmit={submitHandler}>
                            <h1 className="mb-4">Shipping Info</h1>
                            <div className="form-group">
                                <label for="address_field">Address</label>
                                <input
                                    type="text"
                                    id="address_field"
                                    className="form-control"
                                    onChange={(e)=>setAddress(e.target.value)}
                                    value={address}
                                    required
                                />
                            </div>



                            <div className="form-group">
                                <label htmlFor="phone_field">Phone No</label>
                                <input
                                    type="phone"
                                    id="phone_field"
                                    className="form-control"
                                    onChange={(e)=>setNumber(e.target.value)}
                                    value={number}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label for="postal_code_field">Postal Code</label>
                                <input
                                    type="number"
                                    id="postal_code_field"
                                    className="form-control"
                                    onChange={(e)=>setPinCode(e.target.value)}
                                    value={pinCode}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label for="postal_code_field">Country</label>
                                <input
                                    type="text"
                                    id="postal_code_field"
                                    className="form-control"
                                    onChange={(e)=>setCountry(e.target.value)}
                                    value={country}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label for="city_field">City</label>
                                <input
                                    type="text"
                                    id="city_field"
                                    className="form-control"
                                    onChange={(e)=>setCity(e.target.value)}
                                    value={city}
                                    required
                                />
                            </div>

                            <button
                              style={{background:'#1BA786', border:'0px'}}
                                type="submit"
                                className="btn btn-block mt-2 py-2 rounded-3"
                            >
                                CONTINUE
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Shipping