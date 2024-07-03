import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom';
import { FaRegEye } from 'react-icons/fa';
import { useSnackbar } from 'notistack';
import { 
  AdminOrders, 
  clearOrderError, 
  getAdminOrders, 
  orderError, 
  orderStatus 
} from '../../slices/orderSlice';

const OrderLists = () => {
  const adminOrders = useSelector(AdminOrders);
  const OrderStatus = useSelector(orderStatus);
  const OrderError = useSelector(orderError);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (OrderError) {
      enqueueSnackbar(OrderError, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        onExited: () => {
          dispatch(clearOrderError());
        },
      });
      return
    }
    dispatch(getAdminOrders());
  }, [dispatch, OrderError, enqueueSnackbar]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: 'Ordered On',
          field: 'date',
          sort: 'asc',
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
        },
        {
          label: 'Phone Number',
          field: 'number',
          sort: 'asc',
        },
        {
          label: 'Amount',
          field: 'amount',
          sort: 'asc',
        },
        {
          label: 'Number of Items',
          field: 'noOfItems',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
          sort: 'asc',
        },
      ],
      rows: [],
    };

    adminOrders.forEach((order) => {
      data.rows.push({
        date: new Date(order.createdAt).toLocaleDateString(),
        name:  <>
        {order.user.name}
        <br />
        <span className='text-secondary' style={{ fontSize: '14px' }}>({order.user.email})</span>
    </>,
        number:order.user.phoneNumber,
        noOfItems: order.orderItems.length,
        amount: formatPrice(order.totalPrice),
        actions: (
          <Link to={`/admin/order/${order._id}`} className='btn btn-primary'>
            <FaRegEye />
          </Link>
        ),
      });
    });

    return data; // Return the data object
  };

  console.log(adminOrders);

  return (
    <div>
      {OrderStatus === 'loading' ? (
        <div className="d-flex align-items-start justify-content-center">
          <div className="loader"></div>
        </div>
      ) : OrderStatus === 'succeeded' && adminOrders.length === 0 ? (
        <h1>No Orders Placed</h1>
      ) : (
        <>
          <Row className="mt-4">
            <Col>
              <h2>Orders</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="table-responsive">
                <MDBDataTable
                  className="px-3"
                  bordered
                  striped
                  hover
                  searching={false}
                  responsive // This makes the table responsive
                  data={setOrders()}
                />
              </div>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default OrderLists;
