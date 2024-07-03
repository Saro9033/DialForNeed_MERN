import React, { useContext, useEffect, useState } from 'react';
import { Navbar, Nav, Button, Container, Row, Col, Offcanvas, DropdownButton, Dropdown, Image } from 'react-bootstrap';
import Search from './Search';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaFilter } from "react-icons/fa6";
import { SidebarContext } from '../../context/SidebarContext';
import Sidebar from '../Products/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { loginAuthUser, loginIsAuthenticated, logoutUser } from '../../slices/authSlice';
import avatarImg from '../../assets/avatar.png';
import { cartItems } from '../../slices/CartSlice';
import { FaShoppingCart } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { RiAdminLine } from "react-icons/ri";
import { MdTaskAlt } from "react-icons/md";
import { RiGitPullRequestLine } from "react-icons/ri";

const Header = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { showSidebar, handleSidebarClose, handleSidebarShow } = useContext(SidebarContext);
  const LoginIsAuthenticated = useSelector(loginIsAuthenticated);
  const user = useSelector(loginAuthUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [showShadow, setShowShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setShowShadow(true);
      } else {
        setShowShadow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const location = useLocation();
  const isSearch = location.pathname.startsWith('/products/search/');

  // logout user
  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate('/');
  }
  const CartItems = useSelector(cartItems);
  const isHome = location.pathname === '/';
  const [showDropdown, setShowDropdown] = useState(false);
  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };
  return (
    <>
      <Navbar expand="lg" className="mb-1 navbar" style={{ background: '#1BA786', transition: 'top 0.3s' }}>
        <Container className='d-flex flex-column'>
          <Row className="w-100 align-items-center justify-content-between">
            <Col xs={6} md={3} lg={4} >
              <Navbar.Brand>
                <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                  <h2>DialForNeed</h2>
                </Link>
              </Navbar.Brand>
            </Col>

            {windowWidth > 990 ? <Col xs={6} md={3} lg={8} className="mt-md-0 text-center">
              {LoginIsAuthenticated ? (
                <>
                  <Nav className="d-flex justify-content-end">
                    <Dropdown
                      align="end"
                      show={showDropdown}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}

                    >
                      <Dropdown.Toggle
                        as="div"
                        className="d-flex align-items-center text-white p-1 rounded-2 bg-transparent border"
                        id="dropdown-custom-components"
                        style={{ cursor: 'pointer', transition: '3s' }}
                      >
                        <figure className='avatar avatar-nav'>
                          <Image width="50px" className='rounded-5' src={user.avatar ?? avatarImg} />
                        </figure>
                        <span className='text-white' style={{ fontSize: '18px' }}>{user.name}</span>
                        {!showDropdown ? <IoIosArrowDown size="1.2rem" className="ml-2" /> : <IoIosArrowUp size="1.2rem" className="ml-2" />}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {user.role === "admin" && (
                          <Dropdown.Item href="/admin/dashboard"><RiAdminLine size="1.2rem" className="mr-2" />Admin Dashboard</Dropdown.Item>
                        )}
                        {(user.role !== "admin") && (
                          <>  <Dropdown.Item className='my-2' href="/myprofile"><CgProfile size="1.2rem" className="mr-2" />My Profile</Dropdown.Item>
                           {(user.role === "user") && 
                           <>
                           <Dropdown.Item className='my-2' href="/my-orders"><BsBoxSeam size="1.2rem" className="mr-2" />Orders</Dropdown.Item>
                           <Dropdown.Item className='my-2' href="/requests"><RiGitPullRequestLine size="1.2rem" className="mr-2" />Requests</Dropdown.Item>

                           </>
                           }
                           {(user.role === "employee") && <Dropdown.Item className='my-2' href="/my-tasks"><MdTaskAlt size="1.2rem" className="mr-2" />Tasks</Dropdown.Item>}

                          </>
                        )}
                        <Dropdown.Item onClick={logoutHandler} className="bg-danger text-white"><MdLogout size="1.2rem" className="mr-2" />Logout</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                    {user.role !== "admin" && (<Nav.Link href="#cart" id="cart" className="ml-3 d-inline-block">
                      <Link to="/cart" style={{ textDecoration: 'none', color: 'white' }}>
                        <FaShoppingCart size="1.8rem" />
                        <span className='badge badge-danger'>{CartItems.length}</span>
                      </Link>
                    </Nav.Link>)}
                  </Nav>
                </>
              )
                : (
                  <Link className="d-flex justify-content-end" to='/login' style={{ textDecoration: 'none' }}>
                    <Button className="btn" style={{ color: 'white', background: 'transparent', border: '1px solid white' }}>Login</Button>
                  </Link>
                )}


            </Col> :
           <Col xs = { 6 } md = { 3 } lg = { 8 } className = "d-flex justify-content-end">
               {LoginIsAuthenticated ?               
            < Button style={{ border: 'none' }} onClick={logoutHandler} className="bg-danger text-white"><MdLogout size="1.2rem" className="mr-2" />Logout</Button>
        :
        <Link className="d-flex justify-content-end" to='/login' style={{ textDecoration: 'none' }}>
          <Button className="btn" style={{ color: 'white', background: 'transparent', border: '1px solid white' }}>Login</Button>
        </Link>}
      
        </Col>
                          
            }
      </Row>
    </Container >
    </Navbar >

      <Navbar expand="lg" className={`pb-3 navbar ${(isHome || isSearch) ? '' : 'd-none'} `} style={{ background: '#FCFCFC', position: 'sticky', top: '0', zIndex: '10', transition: 'box-shadow 0.3s' }}>
        <Container className={`d-flex flex-column ${showShadow ? 'shadow' : ''}`}>
          <Row className='w-100 align-items-center justify-content-center '>
            {(isSearch &&  windowWidth < 990) && <Col lg={2} xs={2}>
              <Button variant="btn btn-primary mx-2" onClick={handleSidebarShow}>
                <FaFilter fontSize='1.2rem' />
              </Button>
            </Col>}
            <Col xs={isSearch ? 10 : 12} lg={12}>
              <Search />
            </Col>
          </Row>
        </Container>
      </Navbar>

      <Offcanvas show={showSidebar} onHide={handleSidebarClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filters</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Sidebar smallDevice={true} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Header;
