import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const CheckOutSteps = ({shipping, payment, confirmOrder }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
    useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    return (
        <div className="checkout-progress  d-flex justify-content-center py-3" style={{background:'#FCFCFC'}}>
        {shipping ? 
                <Link to="/shipping">
                    <div className="triangle2-active"></div>
                    <div className="step active-step" style={{fontSize:windowWidth < 690 ?'9px':'unset'}}>Shipping</div>
                    <div className="triangle-active"></div> </Link> :
                <Link to="/shipping">
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete" style={{fontSize:windowWidth < 690 ?'9px':'unset'}}>Shipping</div>
                    <div className="triangle-incomplete"></div> </Link>
            }

            {confirmOrder ?
                <Link to="/confirmOrder">
                    <div className="triangle2-active"></div>
                    <div className="step active-step" style={{fontSize:windowWidth < 690 ?'9px':'unset'}}>confirmOrder</div>
                    <div className="triangle-active"></div> </Link> :
                <Link to="/confirmOrder">
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete" style={{fontSize:windowWidth < 690 ?'9px':'unset'}}>confirmOrder</div>
                    <div className="triangle-incomplete"></div> </Link>
            }

            {payment ?
                <Link to="/payment">
                    <div className="triangle2-active"></div>
                    <div className="step active-step" style={{fontSize:windowWidth < 690 ?'9px':'unset'}}>Payment</div>
                    <div className="triangle-active"></div> </Link> :
                <Link to="/payment">
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete" style={{fontSize:windowWidth < 690 ?'9px':'unset'}}>Payment</div>
                    <div className="triangle-incomplete"></div> </Link>
            }
        </div>
    )
}

export default React.memo(CheckOutSteps)