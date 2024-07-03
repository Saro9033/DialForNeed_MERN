import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { loginAuthUser } from '../../slices/authSlice';
import { getOrderDetail, orderDetail, orderStatus } from '../../slices/orderSlice';

const OrderDetails = () => {
    const { id } = useParams();
    const LoginAuthUser = useSelector(loginAuthUser);
    const OrderDetail = useSelector(orderDetail);
    const OrderStatus = useSelector(orderStatus);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrderDetail(id));
    }, [dispatch, id]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    console.log(OrderDetail)
    return (
        <div className='container' style={{ minHeight: '100vh' }}>
            <div className="row pt-3 d-flex justify-content-between mb-5">
                <div className="col-12 col-lg-8 mb-4 order-confirm">
                    {/* <div id="order_summary" className="table-responsive mb-4">
                        <h4 className="mb-3">Shipping Info</h4>
                        <hr />
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td><b>Name</b></td>
                                    <td>:&nbsp;&nbsp;&nbsp;&nbsp;{LoginAuthUser?.name}</td>
                                </tr>
                                <tr>
                                    <td><b>Email</b></td>
                                    <td>:&nbsp;&nbsp;&nbsp;&nbsp;{LoginAuthUser?.email}</td>
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
                        </table>
                        <hr />
                    </div> */}
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
                        {/* <div id="order_summary">
                            <h4>Ordered Items</h4>
                            <hr />
                            {OrderStatus === "loading" ? (
                                <div className="d-flex align-items-start justify-content-center">
                                    <div className="loader"></div>
                                </div>
                            ) : (
                                <>
                                    <div className="table-responsive mb-4">
                                        <table className="table table-borderless">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Product</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Type</th>
                                                    <th scope="col">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {OrderDetail?.orderItems?.map((item, index) => (
                                                    <tr key={index} className="align-middle">
                                                        <td style={{ width: 'fit-content' }}>
                                                            <Link to={`/product/${item?.productId?._id}`} style={{ color: 'unset', textDecoration: 'none' }}>
                                                                <div className="d-flex flex-column align-items-center">
                                                                    <img
                                                                        src={item?.productId?.images[0]?.image}
                                                                        alt={item?.productId?.name}
                                                                        width="50"
                                                                        className="border rounded-3 me-3"
                                                                        style={{ objectFit: 'cover' }}
                                                                    />
                                                                    <span>{`${item?.productId?.name} (${item?.quantity}x)`}</span>
                                                                </div>
                                                            </Link>
                                                        </td>
                                                        <td>{formatCurrency(item?.productId?.price)}</td>
                                                        <td>{item.productId?.type}</td>
                                                        <td style={{ fontWeight: '700' }} className={item.status.toLowerCase().includes('pending') ? 'text-danger' : 'text-success'}>
                                                            {item.status}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            )}
                            <hr />
                        </div> */}
                        <div id={windowWidth > 990 ? 'order_summary' : ''} className={`${windowWidth > 990 ? '' : 'shadow-sm p-2 rounded-3 '}`}>
                            {windowWidth > 990 ? <h5>Your Items</h5> : ''}
                            {windowWidth > 990 ? <hr /> : ''}
                            {OrderDetail?.orderItems?.map((item, index) => (

                                <Link style={{ color: 'unset', textDecoration: 'none' }} to={`/product/${item?.productId?._id}`} className="my-2 py-1 bg-white rounded-1 shadow-sm d-flex m-0 w-100 align-items-center">
                                    <img src={item?.productId?.images[0]?.image} alt={item?.productId?.name} className='border' style={{ objectFit: 'cover' }} height={windowWidth < 990 ? '60px' : '90px'} width={windowWidth < 990 ? '150px' : '20%'} />

                                    <div className={`${windowWidth < 990 ? 'pl-4' : 'pl-3'} w-100 d-flex flex-column`}>
                                        <div style={{ textDecoration: 'none', color: 'unset' }} className='mt-2' to={`/product/${item._id}`}>
                                            {windowWidth > 990 ?
                                                <h5>{item?.productId?.name}{` (${item.quantity}x)`} </h5>
                                                :
                                                <h6>{item?.productId?.name} {` (${item.quantity}x)`}</h6>
                                            }

                                        </div>

                                        <div className='d-flex justify-content-between mx-1'>
                                            <div id="card_item_price" style={{ color: 'black', fontSize: '15px' }} className='m-0'>
                                                {windowWidth > 990 ?
                                                    <h6>  {formatCurrency(item?.productId?.price)}</h6>
                                                    :
                                                    <p className='m-0'>{formatCurrency(item?.productId?.price)}</p>
                                                }
                                            </div>
                                            <span style={{ fontWeight: '700' }} className={item.status.toLowerCase().includes('pending') ? 'text-danger' : 'text-success'}>
                                                {item.status}
                                            </span>
                                        </div>                                                                               </div>
                                </Link>
                            ))}
                            {windowWidth > 990 ? <hr /> : ''}
                        </div>
                    </div>
                </div>

                <div className="d-none d-md-block col-12 col-lg-4">
                    <div id="order_summary">
                        <div className='d-flex align-items-center justify-content-between'>
                            <h4>Payment</h4>

                            <h5 className={`m-0 ${OrderDetail?.paymentInfo?.status?.includes("Success") || OrderDetail?.paymentInfo?.status?.includes("success") ? 'text-success' : 'text-danger'}`}>
                                {OrderDetail?.paymentInfo?.status}&nbsp;
                            </h5>
                        </div>
                        <hr />
                        <p>Total Amount: <span className="order-summary-values">{formatCurrency(OrderDetail?.totalPrice)}</span></p>
                        <hr />
                    </div>
                </div>

                <div className='d-block fixed-bottom d-md-none border bg-white col-12 pt-2 px-4' style={{ zIndex: '0', fontSize: '22px', paddingBottom: '60px' }}>
                    <div className='d-flex align-items-center justify-content-between' >
                        <div className='d-flex align-items-center'>
                            <h5  className='m-0'>Payment</h5> &nbsp;
                            <h6 className={`m-0 ${OrderDetail?.paymentInfo?.status?.includes("Success") || OrderDetail?.paymentInfo?.status?.includes("success") ? 'text-success' : 'text-danger'}`}>
                                ({OrderDetail?.paymentInfo?.status})</h6>
                        </div>
                        <div><b>{formatCurrency(OrderDetail?.totalPrice)}</b> </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default OrderDetails;
