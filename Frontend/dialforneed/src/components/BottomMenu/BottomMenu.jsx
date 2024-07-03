import React from 'react'
import BottomMenuItems from './BottomMenuItems'
import { RiAdminLine } from "react-icons/ri";
import { GoHomeFill } from "react-icons/go";

import { GoHome } from "react-icons/go";
import { useSelector } from 'react-redux';
import { loginAuthUser, loginIsAuthenticated } from '../../slices/authSlice';
import { RiLoginCircleLine, RiLoginCircleFill } from "react-icons/ri";

import { BsBoxSeam , BsBoxSeamFill } from "react-icons/bs";
import { PiShoppingCartSimpleDuotone, PiShoppingCartSimpleLight  } from "react-icons/pi";

import { FaRegUserCircle } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

import { MdOutlineDashboard } from "react-icons/md";
import { MdDashboard } from "react-icons/md";

import { RiProductHuntLine } from "react-icons/ri";
import { RiProductHuntFill } from "react-icons/ri";

import { FaRegComments } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import { MdCategory, MdOutlineCategory  } from "react-icons/md";
import { MdOutlineBrandingWatermark, MdBrandingWatermark  } from "react-icons/md";
import { PiUsersThreeThin, PiUsersThreeFill  } from "react-icons/pi";

import { RiTaskLine, RiTaskFill  } from "react-icons/ri";
import { RiGitPullRequestLine , RiGitPullRequestFill } from "react-icons/ri";
import { BiSolidCarousel, BiCarousel  } from "react-icons/bi";
import { cartItems } from '../../slices/CartSlice';

const BottomMenu = () => {
    const LoginIsAuthenticated = useSelector(loginIsAuthenticated);
    const user = useSelector(loginAuthUser);

    return (
        <div className='d-sm-block d-md-block  d-lg-none'>
            <div className='bottomMenu '>
                <ul id='menu' className='p-0 px-2 m-0'>
               {(user?.role !== "admin") ? <BottomMenuItems link={'/'} icon={GoHome} iconActive={GoHomeFill} title="HOME" /> : ''}

                    {!LoginIsAuthenticated ?

                        (<>
                            <BottomMenuItems link={'/login'} icon={RiLoginCircleLine} iconActive={RiLoginCircleFill} title="LOGIN" />
                        </>)
                        :
                        (user.role === "user") ?
                            <>
                                <BottomMenuItems link={'/my-orders'} icon={BsBoxSeam} iconActive={BsBoxSeamFill} title="ORDERS" />
                                <BottomMenuItems link={'/requests'} icon={RiGitPullRequestLine} iconActive={RiGitPullRequestFill} title="REQUESTS" />

                                <BottomMenuItems link={'/cart'} icon={PiShoppingCartSimpleLight} iconActive={PiShoppingCartSimpleDuotone}cart={true} title="CART" /> 
                                <BottomMenuItems link={'/myprofile'} icon={FaRegUserCircle} iconActive={FaUserCircle} title="PROFILE" />
                            </>
                            :
                            (user.role === "admin") ?
                                <div className='w-100 d-flex justify-content-between' style={{overflow:'auto', scrollbarWidth:'none'}}>
                                 <BottomMenuItems isAdmin={true} link={'/'} icon={GoHome} iconActive={GoHomeFill} title="HOME" />
                                <BottomMenuItems isAdmin={true} link={'/admin/dashboard'} icon={MdOutlineDashboard} iconActive={MdDashboard} title="DASHBOARD" />
                                <BottomMenuItems  isAdmin={true} link={'/admin/products'} icon={RiProductHuntLine} iconActive={RiProductHuntFill} title="PRODUCTS" />
                                <BottomMenuItems isAdmin={true} link={'/admin/orders'} icon={BsBoxSeam} iconActive={BsBoxSeamFill} title="ORDERS" />
                                <BottomMenuItems isAdmin={true} link={'/admin/users'} icon={FaRegUserCircle} iconActive={FaUserCircle} title="USERS" />
                                <BottomMenuItems isAdmin={true} link={'/admin/reviews'} icon={FaRegComments} iconActive={FaComments} title="COMMENTS" />
                                <BottomMenuItems isAdmin={true} link={'/admin/categories'} icon={MdOutlineCategory} iconActive={MdCategory} title="CATEGORIES" />
                                <BottomMenuItems  isAdmin={true} link={'/admin/brands'} icon={MdOutlineBrandingWatermark} iconActive={MdBrandingWatermark } title="BRANDS" />
                                <BottomMenuItems isAdmin={true} link={'/admin/employees'} icon={PiUsersThreeThin} iconActive={PiUsersThreeFill } title="EMPLOYEES" />
                                <BottomMenuItems isAdmin={true} link={'/admin/tasks'} icon={RiTaskLine} iconActive={RiTaskFill } title="TASKS" />
                                <BottomMenuItems isAdmin={true} link={'/admin/carousels'} icon={BiSolidCarousel} iconActive={BiCarousel } title="CAROUSELS" />

                                </div>
                                :
                                <>
                                <BottomMenuItems link={'/my-tasks'} icon={RiTaskLine} iconActive={RiTaskFill} title="MY TASKS" />

                                <BottomMenuItems link={'/myprofile'} icon={FaRegUserCircle} iconActive={FaUserCircle} title="PROFILE" />
                               
                                </>


            }



                    {/* <BottomMenuItems link={'/offers'} icon={FoodOU} iconActive={FoodOL} title="FOOD" />
                    <BottomMenuItems link={'/cart'} icon={CartOU} iconActive={CartOL} title="CART" cart={true} />
                    <BottomMenuItems link={'/search'} icon={SearchOU} iconActive={SearchOL} title="SEARCH" />
                    <BottomMenuItems link={'/account'} icon={UserOU} iconActive={UserOL} title="ACCOUNT" /> */}
                </ul>
            </div>
        </div>
    )
}

export default BottomMenu