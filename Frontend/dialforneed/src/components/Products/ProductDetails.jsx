import React, { Fragment, useEffect, useMemo } from 'react';
import { Row, Col, Table, Button, Modal, Form, Container } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClearError, ClearProduct, ClearReviewSubmmited, IsReviewSubmitted, SingleProduct, SingleProductError, SingleProductStatus, createReview, fetchProductById, productError, productStatus } from '../../slices/ProductsSlice';
import { matchPath, useLocation, useMatch, useParams } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import { renderContent } from '../../utils/getContent';
import StarRating from '../../utils/StartRating';
import Carousel from 'react-bootstrap/Carousel';
import { addItemToCart } from '../../slices/CartSlice';
import { loginAuthUser, loginIsAuthenticated } from '../../slices/authSlice';
import ProductReview from './ProductReview';
import { ClearOrder, getUserOrder, userOrders } from '../../slices/orderSlice';
import { useSnackbar } from 'notistack';

const ProductDetails = () => {
    const { enqueueSnackbar } = useSnackbar();

    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const { id } = useParams()
    const product = useSelector(SingleProduct);
    const status = useSelector(SingleProductStatus);
    const error = useSelector(SingleProductError);
    const user = useSelector(loginAuthUser);

    const [rating, setRating] = useState(1)
    const [comment, setComment] = useState('')

    //cart
    const dispatch = useDispatch();

    const ReviewSubmitted = useSelector(IsReviewSubmitted)
    useEffect(() => {
        if (ReviewSubmitted) {
            handleClose();
            enqueueSnackbar("Review Submitted Successfully!", {
                variant: 'success',
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'center',
                },
                onExited: () => {
                    dispatch(ClearReviewSubmmited());
                  },
              })
              return
        }

        if (error) {
            enqueueSnackbar(error, {
                variant: 'error',
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'center',
                },
                onExited: () => {
                  dispatch(ClearError());
                },
              })
              return
        }

        if (!product || ReviewSubmitted) {
            dispatch(fetchProductById(id));
        }

    }, [dispatch, id, ReviewSubmitted, error]);



    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, {
                variant: 'error',
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'center',
                }
              })
              return
        }
        return () => {
            dispatch(ClearProduct());
        };
    }, [error]);


    //cart quantity
    const [quantity, setQuantity] = useState(1)

    const increaseQty = () => {
        setQuantity((prevQuantity) => {
            if (product.stock === 0 || prevQuantity >= product.stock) return prevQuantity;
            return prevQuantity + 1;
        });
    };

    const decreaseQty = () => {
        setQuantity((prevQuantity) => {
            if (prevQuantity === 1) return prevQuantity;
            return prevQuantity - 1;
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    };

    const addToCart = () => {
        dispatch(addItemToCart({ productId: product._id, quantity }));
        enqueueSnackbar("Cart Item Added!", {
            variant: 'success',
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            }
          })
    };

    const handleRating = () => {
        const formData = new FormData()
        formData.append('rating', rating)
        formData.append('comment', comment)
        formData.append('productId', id)
        dispatch(createReview(formData))
        setComment("")
        setRating("")
    }

    const LoginIsAuthenticated = useSelector(loginIsAuthenticated)
  //  const UserOrders = useSelector(userOrders)

    // useEffect(() => {
    //     dispatch(getUserOrder());
    //     return () => {
    //         dispatch(ClearOrder());
    //     };
    // }, [dispatch]);

    // Efficiently compute product IDs once user orders are fetched
    // const productIdsSet = useMemo(() => {
    //     const productIds = new Set();
    //     for (const order of UserOrders) {
    //         for (const item of order.orderItems) {
    //             // Add product ID to set only if status is "success"
    //             if (item.productId?._id === id && (item.status === "success" || item.status === "Success")) {
    //                 productIds.add(item.productId._id);
    //             }
    //         }
    //     }
    //     return productIds;
    // }, [UserOrders, id]);

    // Check if the product exists and status is "success"
   // const productExistsAndSuccess = useMemo(() => productIdsSet.has(id), [productIdsSet, id]);

    // useEffect(() => {
    //     if (UserOrders.length > 0) {
    //         console.log(productExistsAndSuccess);
    //     }
    // }, [UserOrders, productExistsAndSuccess]);

    // console.log(productExistsAndSuccess )

    const renderSuccess = (data) => (
        <>
            {product && (
                    <Row className="justify-content-between pt-3 ">
                        <Col xs={12} lg={5} className="text-center d-flex align-items-start justify-content-center">
                            <Carousel pause="hover">
                                {product.images.map((image, index) => (
                                    <Carousel.Item key={index}>
                                        <img
                                            src={image.image}
                                            alt={`image-${index}`}
                                            className="d-block w-100"
                                            style={{ width: '100%', height:window.innerWidth<990 ? '200px': '400px' }}
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </Col>

                        <Col xs={12} lg={7} className={`pt-5  mt-lg-0 ${window.innerWidth<990 ? 'px-4':''}`}  >
                            <h3>{product.name}</h3>
                           {product.reviews.length > 0 && <div className="d-flex align-items-center">
                                &nbsp;<StarRating rating={product.ratings} />
                                <span id="no_of_reviews" className="ml-2">({product.reviews.length} Ratings)</span>
                            </div>}
                            <hr />

                            <p id="product_price" className="font-weight-bold">{formatCurrency(product.price)}</p>
                            <div className="d-flex align-items-center">
                                <div className="d-flex align-items-center">
                                    <Button onClick={decreaseQty} variant="danger" className="mr-2 count">-</Button>
                                    <span className="border p-2 px-3 rounded-2 mx-1">
                                        {quantity}
                                    </span>
                                    <Button onClick={increaseQty} variant="primary" className="ml-2 count">+</Button>
                                </div> &nbsp;&nbsp;
                                <Button type="button" style={{background:'#1BA786'}} onClick={addToCart} disabled={(product.stock == 0 || user?.role === "admin" ) ? true : false} >Add to Cart</Button>
                            </div>
                            <hr />

                            <Table responsive borderless>
                                <tbody>
                                    <tr>
                                        <td style={{ width: '150px' }}><span style={{ fontWeight: '700' }}>Status:</span></td>
                                        <td><p className='m-0'>{product.stock > 0 ? <span id="stock_status" className="text-success">In Stock </span> : <span id="stock_status" className="text-danger">Out of Stock </span>}</p></td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: '150px' }}><span style={{ fontWeight: '700' }}>Product Type:</span></td>
                                        <td>{product.type}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: '150px' }}><span style={{ fontWeight: '700' }}>Brand:</span></td>
                                        <td>{product.brand}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: '150px' }}><span style={{ fontWeight: '700' }}>Category:</span></td>
                                        <td>{product.category}</td>
                                    </tr>
                                </tbody>
                            </Table>

                            <hr />

                            <h5 className="mt-2">About this Item:</h5>
                            <p>
                                {product.description}
                            </p>
                            <hr />

                            {LoginIsAuthenticated ? <Button  id="review_btn" type="button" className="mt-4" onClick={handleShow}>
                                Submit Your Review
                            </Button> : <div className='alert alert-danger mt-5'>Login to Post Review</div>
                            }

                            {product.reviews && product.reviews.length > 0 ? <ProductReview reviews={product.reviews} /> : ''}

                            <Modal show={showModal} onHide={handleClose} centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>Submit Review</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className=''>
                                    <form onSubmit={handleRating}>
                                        <ul className="stars list-inline d-flex mt-1 align-items-center justify-content-center">
                                            {[1, 2, 3, 4, 5].map((star, index) => (
                                                <li key={index} className={`star ${star <= rating ? 'orange' : ''}`}
                                                    onClick={() => setRating(star)}
                                                    onMouseOver={(e) => e.target.classList.add('yellow')}
                                                    onMouseOut={(e) => e.target.classList.remove('yellow')}

                                                    value={star}>
                                                    <i className="fa fa-star"></i>
                                                </li>
                                            ))}

                                        </ul>


                                        <Form.Group >
                                            <Form.Control onChange={(e) => setComment(e.target.value)} value={comment} as="textarea" rows={3} placeholder="Write your review" />
                                        </Form.Group> :


                                        <Button diabled={status === "loading"} className="float-right review-btn px-4 text-white" type="submit">Submit</Button>
                                    </form>
                                </Modal.Body>
                            </Modal>
                        </Col>
                    </Row>
                )
            }</>
    );

    return (

        <Fragment>
            <MetaData title={product ? product.name : "Product Details"} />
            <div className="pt-1">
                {renderContent(status, product, error, renderSuccess)}
            </div>

        </Fragment>
    );
};

export default ProductDetails;
