import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cartItems } from '../../slices/CartSlice';
import { useSelector } from 'react-redux';

const BottomMenuItems = ({ link, icon: Icon, iconActive: IconActive, title, cart, isAdmin }) => {
    const { pathname } = useLocation();
    const isActive = pathname === link;
    const CartItems = useSelector(cartItems);

  return (
    <Link style={{ textDecoration: 'none' }} className={`d-flex ${isAdmin ? 'mr-4':''} flex-column align-items-center`} to={link}>
      {(cart) &&
        <p style={{ fontSize: '6px', position: 'absolute' }} className="m-0 badge rounded-pill bg-danger">{CartItems.length !== 0 ? CartItems.length : null}</p>
      }
       {isActive ?  <IconActive fontSize="1.5rem" color="#1BA786"/> :  <Icon fontSize="1.5rem" />  }
      <span style={{ fontSize: '10px', color: '#4c4F53', fontFamily: 'poppins' }}>{title}</span>
    </Link>
  )
}

export default React.memo(BottomMenuItems)