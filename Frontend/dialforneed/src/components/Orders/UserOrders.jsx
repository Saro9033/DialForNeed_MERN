import React, { useEffect } from 'react';
import MetaData from '../Layouts/MetaData';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrder, orderStatus, userOrders } from '../../slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import { FaRegEye } from 'react-icons/fa';

const UserOrders = () => {
    const userOrdersData = useSelector(userOrders);
    const dispatch = useDispatch();
    const Status = useSelector(orderStatus);
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getUserOrder());
    }, [dispatch]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    return (
        <>
            <MetaData title="My Orders" />
            <Container style={{ minHeight: '100vh' }}>
                {Status === "loading" ? (
                    <div className="d-flex align-items-start justify-content-center">
                        <div className="loader"></div>
                    </div>
                ) : Status === "succeeded" && userOrdersData.length === 0 ? (
                    <h1>No Orders Placed</h1>
                ) : (
                    <Row className="pt-4">
                        <Col>
                            <h2>My Orders</h2>
                        </Col>
                    </Row>
                )}
                
                {userOrdersData.length > 0 && (
                    <div className="table-responsive pt-4">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>ORDER ID</th>
                                    <th>DATE</th>
                                    <th>ITEMS</th>
                                    <th>AMOUNT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userOrdersData.map(item => (
                                       <tr key={item._id} onClick={()=>navigate(`/order/${item._id}`) }>
                                           <td>{item._id}</td>
                                           <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                           <td>{item.orderItems.length}</td>
                                           <td>{formatPrice(item.totalPrice)}</td>
                                   </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Container>
        </>
    );
};

export default UserOrders;
