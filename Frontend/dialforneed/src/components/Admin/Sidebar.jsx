import React, { useEffect, useState } from 'react'
import { FaProductHunt } from "react-icons/fa6";
import { FaBasketShopping } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { MdPreview } from "react-icons/md";
import { Link } from 'react-router-dom';
import { MdCategory } from "react-icons/md";
import {  MdBrandingWatermark  } from "react-icons/md";
import { PiUsersThreeFill  } from "react-icons/pi";

import {  RiTaskFill  } from "react-icons/ri";
import { BiSolidCarousel } from "react-icons/bi";


const Sidebar = () => {


    return (
        <div className={`sidebar-wrapper`}>
            <nav id="sidebar">
                <ul className="list-unstyled components pt-0">
                    <li >
                        <Link to="/admin/dashboard" ><i className="fas fa-tachometer-alt"></i> Dashboard</Link>
                    </li>

                    <li>
                        <Link to="/admin/products" className='d-flex align-items-center '><FaProductHunt/>&nbsp; Products</Link>
                    </li>

                    <li>
                        <Link to="/admin/orders" className='d-flex align-items-center '><FaBasketShopping/> &nbsp; Orders</Link>
                    </li>

                    <li>
                        <Link to="/admin/users" className='d-flex align-items-center '><FaUserCircle/>&nbsp;Users</Link>
                    </li>
                    <li>
                        <Link to="/admin/reviews" className='d-flex align-items-center '><MdPreview/>&nbsp;Reviews</Link>
                    </li>
                    <li>
                        <Link to="/admin/categories" className='d-flex align-items-center '><MdCategory/>&nbsp;Categories</Link>
                    </li>
                    <li>
                        <Link to="/admin/brands" className='d-flex align-items-center '><MdBrandingWatermark/>&nbsp;Brands</Link>
                    </li>
                    <li>
                        <Link to="/admin/employees" className='d-flex align-items-center '><PiUsersThreeFill/>&nbsp;Emploees</Link>
                    </li>
                    <li>
                        <Link to="/admin/tasks" className='d-flex align-items-center '><RiTaskFill/>&nbsp;Tasks</Link>
                    </li>
                    <li>
                        <Link to="/admin/carousels" className='d-flex align-items-center '><BiSolidCarousel/>&nbsp;Carousels</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar