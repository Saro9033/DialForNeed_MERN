import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const Admin = () => {
  return (
    <div className='row'>
      <div className='col-lg-2 d-none d-sm-none d-md-none  d-lg-block'>
        <Sidebar />
      </div>
      <div className='col-lg-10 col-md-12 col-sm-12 col-12'>
        <div className='px-3 '> 
        <Outlet />
        </div>
      </div>
    </div>
  );
};


export default Admin;
