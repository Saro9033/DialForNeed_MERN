import React from 'react'
import StarRating from '../../utils/StartRating';

const ProductReview = ({ reviews }) => {
console.log(reviews)
    return (
        <div>
            <div class="container container-fluid">
                <h4 className='mt-5'>Other's Reviews:</h4>
                <div class="reviews w-100" >
                    <hr />
                    {reviews && reviews.map((review =>
                     <div key={review._id}>
                     <div className='review-container'>
                         <div className='review-user-info'>
                             <img src={review.user?.avatar} width="40" height="40" className="review-avatar" alt="" />
                             <div className='review-user-details d-flex'>
                                 <p className="review-user-name">{review.user?.name}</p>&nbsp;
                                 <p className="review-user-email">({review.user?.email})</p>
                             </div>
                         </div>
                         <StarRating rating={review.rating}/>
                         <p className="review-comment">{review?.comment}</p>
                     </div>
                     
                     <hr className='review-divider' />
                 </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default React.memo(ProductReview)