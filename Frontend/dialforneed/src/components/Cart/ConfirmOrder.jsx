import React, { useContext, useEffect, useState } from 'react'
import CheckOutSteps from './CheckOutSteps'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser, loginAuthUser } from '../../slices/authSlice'
import { cartItems } from '../../slices/CartSlice'
import { Link, useNavigate } from 'react-router-dom'
import { SidebarContext } from '../../context/SidebarContext'
import API from '../../API'

const ConfirmOrder = () => {
    const LoginAuthUser = useSelector(loginAuthUser)
    const CartItems = useSelector(cartItems);
    const navigate = useNavigate()

    //Shipping price
    const calculateSubtotal = () => {
        let grandTotal = 0;
        const itemsDetail = CartItems.map(item => {
            const itemTotal = item.price * item.quantity;
            grandTotal += itemTotal;
            return {
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                image: item.image,
                itemTotal
            };
        });
        return { itemsDetail, grandTotal };
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const processPayment = () => {
        const data = {
            itemsPrice: formatCurrency(calculateSubtotal().grandTotal),
            totalPrice: formatCurrency(calculateSubtotal().grandTotal)
        }
        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        navigate('/payment')
    }

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <div className='container' style={{ minHeight: '100vh', marginBottom: windowWidth > 990 ? ' ' : '90px'}}>
                <CheckOutSteps confirmOrder={true} />
                <div className="row mt-2 d-flex justify-content-between mb-5">
                    <div className="col-12 col-lg-8 mb-4 order-confirm">
                        <div id={windowWidth > 990 ? 'order_summary' : ''} className={`${windowWidth > 990 ? 'table-responsive mb-4' : 'shadow-sm p-3 rounded-3 mb-4'}`}>
                            {windowWidth > 990 ?
                                <>  <h5 className="mb-3">Delivery To:</h5>
                                    {windowWidth > 990 ? <hr /> : ''}
                                    <table className={windowWidth > 990 ? 'table' : ''}>
                                        <tbody style={{ background: '#FCFCFC' }}>
                                            <tr>
                                                <td><b>Customer Name</b></td>
                                                <td>:&nbsp;&nbsp;&nbsp;&nbsp;{LoginAuthUser?.name}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Phone Number</b></td>
                                                <td>:&nbsp;&nbsp;&nbsp;&nbsp;{LoginAuthUser?.phoneNumber}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Address</b></td>
                                                <td>:&nbsp;&nbsp;&nbsp;&nbsp;{LoginAuthUser?.address}, {LoginAuthUser?.city}, {LoginAuthUser?.country}, {LoginAuthUser?.postalCode}</td>
                                            </tr>
                                        </tbody>
                                    </table> </> :

                                <div>
                                    <div className='d-flex flex-column'>
                                        <h6 className=""><b>Delivery To:</b></h6>
                                        <b>Customer Name</b>
                                        <span className='mt-2'>{LoginAuthUser?.address}, {LoginAuthUser?.city}, {LoginAuthUser?.country}, {LoginAuthUser?.postalCode}, {LoginAuthUser?.phoneNumber}</span>
                                    </div>

                                </div>

                            }
                            {windowWidth > 990 ? <hr /> : ''}
                        </div>

                        <div className='row m-0 mb-4'>
                            <div id={windowWidth > 990 ? 'order_summary' : ''} className={`${windowWidth > 990 ? '' : 'shadow-sm p-2 rounded-3 '}`}>
                                {windowWidth > 990 ? <h5>Your Cart Items</h5> : ''}
                                {windowWidth > 990 ? <hr /> : ''}
                                {calculateSubtotal().itemsDetail.map((item, index) => (
                                    // <div key={index} className="m-3 d-flex justify-content-between align-items-center">
                                    //     <img src={item.image} alt={item.image} width="100" className='border rounded-3' style={{objectFit:'cover'}} />
                                    //     <p className='m-0'>{`${item.name} (${item.quantity}x)`}</p>
                                    //     <p className='m-0'>{formatCurrency(item.itemTotal)}</p>
                                    // </div>
                                    <div className="my-2 py-1 bg-white rounded-1 shadow-sm d-flex m-0 w-100 align-items-center">
                                        <img src={item.image} alt={item.name} className='border' style={{ objectFit: 'cover' }} height={windowWidth < 990 ? '60px' : '90px'} width={windowWidth < 990 ? '150px' : '20%'} />

                                        <div className={`${windowWidth < 990 ? 'pl-4' : 'pl-3'} w-100 d-flex flex-column`}>
                                            <div style={{ textDecoration: 'none', color: 'unset' }} className='mt-2' to={`/product/${item._id}`}>
                                                {windowWidth > 990 ?
                                                    <h5>{item.name}{` (${item.quantity}x)`} </h5>
                                                    :
                                                    <h6>{item.name} {` (${item.quantity}x)`}</h6>
                                                }

                                            </div>

                                            <div className='d-flex '>
                                                <div id="card_item_price" style={{ color: 'black', fontSize: '15px' }} className='m-0'>
                                                {windowWidth > 990 ?
                                                 <h6>  {formatCurrency(item.price)}</h6>
                                                 :
                                                 <p className='m-0'>{formatCurrency(item.price)}</p>
                                                 }
                                                </div>
                                            </div>                                                                               </div>
                                    </div>
                                ))}
                                {windowWidth > 990 ? <hr /> : ''}
                            </div>
                        </div>

                    </div>
                    <div className=" d-none d-md-block col-12 col-lg-4">
                        <div id="order_summary">
                            {windowWidth > 990 ? <h5>Price Details:</h5> : <h6>Price Details</h6>}
                            <hr />
                            <p>Subtotal:  <span className="order-summary-values">{formatCurrency(calculateSubtotal().grandTotal)}</span></p>
                            <hr />
                            <div className=" d-flex justify-content-between align-items-center">
                                <p className='m-0 order-summary-values'>Total:</p>
                                <p className='m-0  order-summary-values'>{formatCurrency(calculateSubtotal().grandTotal)}</p>
                            </div>                            <hr />
                            <button id="checkout_btn" onClick={processPayment} className="btn btn-primary btn-block">Proceed to Payment</button>
                        </div>
                    </div>

                    <div className='d-block fixed-bottom d-md-none border bg-white col-12 pt-2 px-4' style={{zIndex:'0',fontSize:'22px', paddingBottom:'60px'}}>
                            <div className='d-flex align-items-center justify-content-between' >
                              <div>  Totals<span>({CartItems.length} items)</span></div> 
                              <div><b>{formatCurrency(calculateSubtotal().grandTotal)}</b> </div>
                            </div>
                            <button id="checkout_btn" onClick={processPayment} className="btn btn-primary mt-2 btn-block">Proceed to Payment</button>
                        </div>
                </div>
            </div></>
    )
}

export default ConfirmOrder