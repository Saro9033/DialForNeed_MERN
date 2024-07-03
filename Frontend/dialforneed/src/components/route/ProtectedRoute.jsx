import React from 'react'
import { useSelector } from 'react-redux';
import { loginAuthStatus, loginAuthUser, loginIsAuthenticated } from '../../slices/authSlice';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children , isAdmin, isEmployee}) => {
  const LoginIsAuthenticated = useSelector(loginIsAuthenticated)
  const LoginAuthStatus = useSelector(loginAuthStatus)
  const User = useSelector(loginAuthUser)
  if (!LoginIsAuthenticated && !LoginAuthStatus === "loading") {
    return <Navigate to="/login" />
  }
  if(LoginIsAuthenticated) {
    if(isAdmin === true && User.role !== "admin"){
      return  <Navigate to="/" />
    }
    if(isEmployee === true && User.role !== "employee"){
      return  <Navigate to="/" />
    }
    return children
  }

  if(LoginAuthStatus === "loading"){
    return <div className="d-flex align-items-start justify-content-center"><div className="loader"></div> </div>
  }
  return children
}

export default React.memo(ProtectedRoute)