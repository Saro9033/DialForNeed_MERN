import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Layouts/Header';
import Footer from './components/Layouts/Footer';
import Home from './components/Home';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { SidebarContext } from './context/SidebarContext';
import React, { Suspense, startTransition, useContext, useEffect } from 'react';
import { loadUser } from './slices/authSlice';
import { useDispatch } from 'react-redux';
import MetaData from './components/Layouts/MetaData'; // Adjusted import path
import ProtectedRoute from './components/route/ProtectedRoute';
import API from './API'; // Added import for API
import Error from './components/Error';
import Admin from './components/Admin/Admin';
import Carousel from './components/Admin/Carousel';
import CategorySearch from './components/Products/CategorySearch';
import CategoriePages from './components/CategoriePages';

// Lazy loaded components
const ProductDetails = React.lazy(() => import('./components/Products/ProductDetails'));
const ProductSearch = React.lazy(() => import('./components/Products/ProductSearch'));
const Myprofile = React.lazy(() => import('./components/Users/Myprofile'));
const RequesetsList = React.lazy(() => import('./components/Users/RequesetsList'));
const ResetPassword = React.lazy(() => import('./components/Users/ResetPassword'));
const Cart = React.lazy(() => import('./components/Cart/Cart'));
const Payment = React.lazy(() => import('./components/Cart/Payment'));
const ConfirmOrder = React.lazy(() => import('./components/Cart/ConfirmOrder'));
const Shipping = React.lazy(() => import('./components/Cart/Shipping'));
const PaymentSuccess = React.lazy(() => import('./components/Cart/PaymentSuccess'));
const UserOrders = React.lazy(() => import('./components/Orders/UserOrders'));
const OrderDetails = React.lazy(() => import('./components/Orders/OrderDetails'));
const EmpTasks = React.lazy(() => import('./components/Employee/EmpTasks'));
const TaskDetail = React.lazy(() => import('./components/Employee/TaskDetail'));
const Login = React.lazy(() => import('./components/Users/Login'));
const Dashboard = React.lazy(() => import('./components/Admin/Dashboard'));
const AdminProduct = React.lazy(() => import('./components/Admin/AdminProduct'));
const OrderLists = React.lazy(() => import('./components/Admin/OrderLists'));
const OrderDetail = React.lazy(() => import('./components/Admin/OrderDetail'));
const UserLists = React.lazy(() => import('./components/Admin/UserLists'));
const ReviewLists = React.lazy(() => import('./components/Admin/ReviewLists'));
const Categories = React.lazy(() => import('./components/Admin/Categories'));
const Brands = React.lazy(() => import('./components/Admin/Brands'));
const Employees = React.lazy(() => import('./components/Admin/Employees'));
const TaskList = React.lazy(() => import('./components/Admin/TaskList'));
const BottomMenu = React.lazy(() => import('./components/BottomMenu/BottomMenu'));

function App() {
  const location = useLocation();
  const { setRzpKey } = useContext(SidebarContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    async function getRazorpayKey() {
      try {
        const { data } = await API.get('/RazorAPI');
        startTransition(() => {
          setRzpKey(data.key);
        });
      } catch (error) {
        console.error('Error fetching Razorpay key:', error);
      }
    }
    getRazorpayKey();
  }, [dispatch, setRzpKey]);

  const isAdminRoute = location.pathname.startsWith('/admin');
  const isLoginRoute = location.pathname === '/login';

  return (
    <>
      <MetaData title="" />
      <Header />
      <div style={{minHeight:'100vh'}}> 

      <Suspense  fallback={<div className="d-flex align-items-center justify-content-center"><div className="loader"></div></div>}>

        {!isAdminRoute && !isLoginRoute && (
          <div style={{backgroundColor:'#FCFCFC',padding:window.innerWidth < 990 ? '0px 20px' : '0px 60px'}}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/categories' element={<CategoriePages />} />

              <Route path='/product/:id' element={<ProductDetails />} />
              <Route path='/products/search/:keyword' element={<ProductSearch />} />
              <Route path='/cateogry-products/:id' element={<CategorySearch />} />
              <Route path='/myprofile' element={<ProtectedRoute><Myprofile /></ProtectedRoute>} />
              <Route path='/requests' element={<ProtectedRoute><RequesetsList /></ProtectedRoute>} />
              <Route path='/password/reset/:token' element={<ResetPassword />} />
              <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
              <Route path='/payment' element={<ProtectedRoute><Payment /></ProtectedRoute>} />
              <Route path='/confirmOrder' element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} />
              <Route path='/shipping' element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
              <Route path='/payment-success' element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
              <Route path='/my-orders' element={<ProtectedRoute><UserOrders /></ProtectedRoute>} />
              <Route path='/order/:id' element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
              <Route path='/my-tasks' element={<Container> <ProtectedRoute isEmployee={true}><EmpTasks /></ProtectedRoute></Container>} />
              <Route path='/taskDetails/:id' element={<ProtectedRoute isEmployee={true}><TaskDetail /></ProtectedRoute>} />
            </Routes>
          </div>
        )}

        {(isAdminRoute || isLoginRoute) && (
        
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/admin/' element={<Admin />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="products" element={<AdminProduct />} />
                <Route path="orders" element={<OrderLists />} />
                <Route path="order/:id" element={<OrderDetail />} />
                <Route path="users" element={<UserLists />} />
                <Route path="reviews" element={<ReviewLists />} />
                <Route path="categories" element={<Categories />} />
                <Route path="brands" element={<Brands />} />
                <Route path="employees" element={<Employees />} />
                <Route path="tasks" element={<TaskList />} />
                <Route path="carousels" element={<Carousel />} />

              </Route>

            </Routes>
        
        )}
        
      </Suspense>
      </div>
      <BottomMenu />

      <Footer />
    </>
  );
}

export default App;
