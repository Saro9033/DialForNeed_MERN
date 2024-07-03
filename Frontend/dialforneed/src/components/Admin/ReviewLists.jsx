import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Row, Col } from 'react-bootstrap';
import { MDBDataTable } from 'mdbreact';
import { FaTrashAlt } from "react-icons/fa";
import { ClearError, ClearIsReviewDeleted, SingleProductError, SingleProductStatus, allReviews, deleteReview, getReviewsByAdmin, isReviewDeleted } from '../../slices/ProductsSlice';

const ReviewLists = () => {
    const AllReviews = useSelector(allReviews);
    const IsReviewDeleted = useSelector(isReviewDeleted);
    const Error = useSelector(SingleProductError);
    const Status = useSelector(SingleProductStatus);
    const [productId, setProductId] = useState('')

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (Error) {
            enqueueSnackbar(Error, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                }
                ,
                onExited: () => {
                    dispatch(ClearError());
                },
            });
            return
        }

        if (IsReviewDeleted) {
            enqueueSnackbar(IsReviewDeleted, {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
                onExited: () => {
                    dispatch(ClearIsReviewDeleted());
                },
            })
            dispatch(getReviewsByAdmin(productId));
            return
        }
    }, [dispatch, Error, enqueueSnackbar, IsReviewDeleted]);

    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc',
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc',
                },

                {
                    label: 'Comment',
                    field: 'comment',
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

        AllReviews.forEach((review) => {
            data.rows.push({
                rating: review.rating,
                user: review.user.name,
                comment: review.comment,
                actions: (
                    <button onClick={(e) => handleDelete(e,review._id)} className='btn btn-primary'>
                        <FaTrashAlt />
                    </button>
                ),
            });
        });

        return data; // Return the data object
    };



    const handleDelete = (e,id) => {
        e.target.disabled =true
        dispatch(deleteReview(productId,id))
    }



    const handleShow = (e) => {
        e.preventDefault()
        dispatch(getReviewsByAdmin(productId));
    }
    return (
        <div>
            <Row className="mt-4">
                <Col>
                    <h2>All Reviews</h2>

                    <form onSubmit={(e)=>handleShow(e)}>
                        <div className='w-75 d-flex mb-3'>
                            <input placeholder='Type Product Id..' className='form-control mr-4' type="text" value={productId} onChange={(e) => setProductId(e.target.value)} />
                            <button disabled={Status==="loading"?true:false} className='btn btn-primary  py-0' type="submit">Search</button>
                        </div>
                    </form>


                </Col>
            </Row>

            {Status === 'loading' ? (
                <div className="d-flex align-items-start justify-content-center">
                    <div className="loader"></div>
                </div>
            ) : Status === 'succeeded' && AllReviews.length === 0 ? (
                <h1>No Reviews Placed</h1>
            ) : (
                <>

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
                                    data={setReviews()}
                                />
                            </div>
                        </Col>
                    </Row>
                </>
            )}



        </div >
    )
}

export default ReviewLists