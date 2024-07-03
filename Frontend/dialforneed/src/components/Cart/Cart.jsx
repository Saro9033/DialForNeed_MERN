import React, { useEffect, useState } from 'react';
import MetaData from '../Layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { cartItems, decreaseCartItemQty, increaseCartItemQty, removeCartItem } from '../../slices/CartSlice';
import { Link, useNavigate } from 'react-router-dom';
import cartEmpty from '../../assets/emptyCart.jpg';
import { MdDelete } from "react-icons/md";

const Cart = () => {
    const CartItems = useSelector(cartItems);
    const dispatch = useDispatch();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const calculateSubtotal = () => {
        let grandTotal = 0;
        const itemsDetail = CartItems.map(item => {
            const itemTotal = item.price * item.quantity;
            grandTotal += itemTotal;
            return {
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                itemTotal
            };
        });
        return { itemsDetail, grandTotal };
    };

    const handleIncreaseQuantity = (productId) => {
        dispatch(increaseCartItemQty(productId));
    };

    const handleDecreaseQuantity = (productId) => {
        dispatch(decreaseCartItemQty(productId));
    };
    const navigate = useNavigate()
    const checkoutHandler = () => {
        navigate('/login?redirect=shipping')
    }
    return (
        <div className="container" style={{ minHeight: '100vh' }}>
            <MetaData title="Your Cart" />
            {CartItems.length === 0 ?
                <>
                    <div className='d-flex flex-column justify-content-center align-items-center w-100' style={{ height: '88vh' }}>
                        <img width='240px' src={cartEmpty} alt="" />
                        <h5>Your cart is empty</h5>
                        <p className='text-secondary' style={{ fontSize: '12px' }}>You can go to the home page to view more Products</p>
                        <Link to='/' className='btn border-0 text-white' style={{ background: '#1BA786', fontWeight: '500' }}>HOME PAGE</Link>
                    </div>
                </>
                :
                <>
                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8">
                            {CartItems && CartItems.map((item) => (
                                <div key={item.productId}>

                                    <div className="my-4 p-2 bg-white rounded-3 shadow d-flex m-0 w-100 align-items-center">
                                        <img src={item.image} alt={item.name} style={{ objectFit: 'cover' }} height="auto" width={windowWidth<990 ? '30%':'15%'} />

                                        <div className={`${windowWidth<990 ? 'pl-2' : 'pl-3' } w-100 d-flex flex-column`}>
                                            <Link style={{ textDecoration: 'none', color: 'unset' }} className='mt-2' to={`/product/${item.productId}`}><b> {item.name}</b></Link>

                                            <div className='d-flex align-items-center justify-content-between'>
                                                <p id="card_item_price" style={{ color: 'black',fontSize:'15px' }} className='m-0'>{formatCurrency(item.price)}</p>

                                                <div className={`mt-2 p-1 d-flex align-items-center ${window.innerWidth < 850 ? 'justify-content-center' : 'justify-content-center'}  `}>
                                                    <div className={`mx-2 d-flex ${window.innerWidth < 850 ? 'justify-content-between w-100' : 'w-100 justify-content-between'}`}>
                                                        <button className="minus px-2" style={{fontSize:'1.5rem',backgroundColor:'#EEEEEE', border:'0px', borderTopLeftRadius:'10px', borderBottomLeftRadius:'10px'}} onClick={() => handleDecreaseQuantity(item.productId)}>-</button>
                                                        <span style={{backgroundColor:'#EEEEEE'}}  className=" py-0 px-2 align-items-center justify-content-center  d-flex count d-inline  w-100 text-center">{item.quantity}</span>
                                                        <button className="plus px-2" style={{fontSize:'1.5rem',backgroundColor:'#EEEEEE', border:'0px', borderTopRightRadius:'10px', borderBottomRightRadius:'10px'}} disabled={item.stock === item.quantity ? true : false} onClick={() => handleIncreaseQuantity(item.productId)}>+</button>
                                                    </div>
                                                    <button className='border rounded-3 p-1' onClick={() => dispatch(removeCartItem(item.productId))}>
                                               <MdDelete fontSize='1.5rem' color='red' />
                                            </button>
                                                </div>
                                            </div>                                                                               </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='d-block fixed-bottom d-md-none border bg-white col-12 pt-2 px-4' style={{zIndex:'0',fontSize:'22px', paddingBottom:'60px'}}>
                            <div className='d-flex align-items-center justify-content-between' >
                              <div>  Totals<span>({CartItems.length} items)</span></div> 
                              <div><b>{formatCurrency(calculateSubtotal().grandTotal)}</b> </div>
                            </div>
                            <button id="checkout_btn" onClick={checkoutHandler} className="btn btn-primary mt-2 btn-block">Check out</button>
                        </div>

                        <div className="d-none d-md-block col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h4>Order Summary</h4>
                                <hr />
                                {calculateSubtotal().itemsDetail.map((item, index) => (
                                    <div key={index} className="d-flex justify-content-between">
                                        <p>{`${item.name} (${item.quantity}x)`}</p>
                                        <p>{formatCurrency(item.itemTotal)}</p>
                                    </div>
                                ))}
                                <hr />
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className='m-0 order-summary-values'>Total:</p>
                                    <p className='m-0  order-summary-values'>{formatCurrency(calculateSubtotal().grandTotal)}</p>
                                </div>
                                <hr />
                                <button id="checkout_btn" onClick={checkoutHandler} className="btn btn-primary btn-block">Check out</button>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

export default Cart;
