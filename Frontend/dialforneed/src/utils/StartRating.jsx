// import React from 'react';

// const StarRating = ({ rating, empty }) => {
//     const fullStars = Math.floor(rating);
//     const halfStars = rating % 1 !== 0 ? 1 : 0;
//     const emptyStars = 5 - fullStars - halfStars;


//     return (
//         <div className="ratings">
//             {Array(fullStars).fill().map((_, index) => (
//                 <i key={index} className="fa fa-star"></i>
//             ))}
//             {halfStars === 1 && <i className="fa fa-star-half-o"></i>}
//             {Array(emptyStars).fill().map((_, index) => (
//                 <i key={index} className={`fa fa-star-o ${empty && 'empty-star'}`}></i>
//             ))}
//         </div>
//     );
// };

// export default StarRating;

import React from 'react';

const StarRating = ({ rating, empty }) => {
    // Ensure rating is within 0 to 5
    rating = Math.min(Math.max(rating, 0), 5);

    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 !== 0 ? 1 : 0;
    const emptyStars = Math.max(5 - fullStars - halfStars, 0); // Ensure non-negative value

    const generateStars = (count, className) => {
        return Array.from({ length: count }, (_, index) => (
            <i key={index} className={`fa ${className}`}></i>
        ));
    };

    return (
        <div className="ratings">
            {generateStars(fullStars, "fa-star")}
            {halfStars === 1 && <i className="fa fa-star-half-o"></i>}
            {generateStars(emptyStars, `fa-star-o ${empty ? 'empty-star' : ''}`)}
        </div>
    );
};

export default StarRating;
