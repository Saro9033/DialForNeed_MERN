import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CheckOutSteps from './CheckOutSteps';
import { SidebarContext } from '../../context/SidebarContext';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAuthUser } from '../../slices/authSlice';
import { loadScript } from '../../utils/loadScript';
import API from '../../API';
import { OrderCompleted, cartItems } from '../../slices/CartSlice';
import { clearOrderError, createOrder, orderError } from '../../slices/orderSlice';
import { useSnackbar } from 'notistack';

const Payment = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { rzpKey } = useContext(SidebarContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const OrderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
  const LoginAuthUser = useSelector(loginAuthUser);
  const CartItems = useSelector(cartItems);
  const OrderError = useSelector(orderError);

  const [paymentError, setPaymentError] = useState('');

//converting amount string to number
  const amountString = OrderInfo?.totalPrice;
  const numericValue = parseInt(amountString?.replace('₹', '').replace(/,/g, ''));


  console.log(numericValue)
  // Load Razorpay SDK
  const loadRazorpay = async () => {
    try {
      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      if (!res) {
        enqueueSnackbar("Razorpay SDK failed to load. Please check your internet connection.'", {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          }
        })
        return false;
      }
      return true;
    } catch (error) {
      console.error('Failed to load Razorpay SDK:', error);
      return false;
    }
  };

  // Handle payment using Razorpay
  const handlePayment = async () => {
    const sdkLoaded = await loadRazorpay();
    if (!sdkLoaded) return;

    const options = {
      key: rzpKey,
      amount: numericValue * 100, // Amount in paise (100 paise = 1 INR)
      currency: 'INR',
      name: LoginAuthUser.name,
      description: 'Payment for your order',
      image: LoginAuthUser.avatar, // Replace with your company logo URL
      handler: (response) => {
        submitPayment()
      },
      prefill: {
        name: LoginAuthUser.name,
        email: LoginAuthUser.email,
        contact: LoginAuthUser.phoneNumber,
      },
      theme: {
        color: '#3399cc',
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };


  // Function to submit payment details to backend
  const submitPayment = async () => {
    try {

      const { data } = await API.post('/payment/process', { amount: numericValue });
      const clientSecretKey = data.clientSecret;
      const orderItems = CartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }));
        const obj = {
          totalPrice: numericValue,
          orderItems: orderItems,
          paymentInfo: {
            id: clientSecretKey,
            status: "success"
          }
        }
        console.log(obj)
        await  dispatch(createOrder(obj))
        dispatch(OrderCompleted())
        navigate('/payment-success');
        enqueueSnackbar("Payment successfull and Your Items ordered!", {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          }
        })
    } catch (error) {
      enqueueSnackbar('Failed to submit payment to backend. Please try again later.', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        }
      })
    }
  };

useEffect(()=>{
  if(OrderError){
    enqueueSnackbar(OrderError, {
      variant: 'error',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
      onExited: () => {
        dispatch(clearOrderError());
      },
    })
    return
  }
},[])
  return (
    <div className='container' style={{  minHeight: '100vh' }}>
      <CheckOutSteps payment={true} />
      <div className='d-flex align-items-center justify-content-center '>
        <button className='btn btn-primary' onClick={handlePayment}>Pay with Razorpay</button>
      </div>
      {paymentError && <p style={{ color: 'red' }}>{paymentError}</p>}
    </div>
  );
};

export default Payment;
