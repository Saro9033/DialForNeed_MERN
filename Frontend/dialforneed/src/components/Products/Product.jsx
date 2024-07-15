import React, { useEffect, useState } from 'react'
import { Col, Card, Button } from 'react-bootstrap';
import StarRating from '../../utils/StartRating';
import { Link } from 'react-router-dom';

const Product = ({ isCategory, category, product, lg }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const truncateTitle = (title, maxLength) => {
  return title.length > maxLength ? title.slice(0, maxLength) + '...' : title;
};

      const maxLength = windowWidth < 990 ? 15 : 20;
  const title = !isCategory && product?.name;
  const displayedTitle = truncateTitle(title, maxLength);

    return (
        <Col key={isCategory ? category._id : product.id} xs={6} sm={6} md={6} lg={lg} className={`py-3 ${windowWidth < 990 ? 'px-1' : 'px-3'} mx-0 d-flex`}>

            <Card className=" h-100 w-100  border-none shadow-sm" style={{ border: '0px', borderRadius: '5px' }}>
                <img variant="top" style={{ borderTopLeftRadius: '5px', borderTopRightRadius: '5px', objectFit: isCategory ? 'contain':'cover', fontFamily: 'Basis Grotesque Pro, sans-serif' }} height={windowWidth < 500 ? '110px' : windowWidth < 990 ? '150px' : '180px'} width='100%'
                    src={isCategory ? category?.image : product?.images[0]?.image} className="mx-auto" />
                <Card.Body className="px-3 d-flex flex-column pt-1 pb-3 mx-0">
                    <p className='mb-0'>
                        <Link style={{ color: '#393F42', textDecoration: 'none', fontSize: windowWidth < 990 ? '15px' : '18px' }} to={isCategory ? `/cateogry-products/${category?._id}` : `/product/${product._id}`}>
                            {isCategory ? category?.title :  displayedTitle  }
                        </Link>
                    </p>

                    <div className="mt-auto">
                        {!isCategory &&
                            <div className={`pb-2 d-flex align-items-center ${(product.reviews.length > 0) ? 'justify-content-between' : 'justify-content-start'}`}>
                                <b style={{ fontFamily: 'sans-serif', fontSize: windowWidth < 990 ? '15px' : '18px' }} >₹{product.price}</b>
                                <div className={`d-flex align-items-center ${product.reviews.length > 0 ? '' : 'd-none'}`}>
                                    {product.reviews.length > 0 && <>  <StarRating rating={1} empty={true}/>
                                        <span id="no_of_reviews">({product.reviews.length})</span> </>}
                                </div>
                            </div>}

                        <Link style={{ textDecoration: 'none', color: 'unset' }} to={isCategory ? `/cateogry-products/${category?._id}` : `/product/${product._id}`}>
                            <Button style={{ fontSize: windowWidth < 990 ? '14px' : '15px', border: 'none', boxShadow: '0 0 0 0.2px black' }} className="view-btn py-1 btn-block">{isCategory ? 'View Products' : 'View Details'}</Button></Link>
                    </div>
                </Card.Body>
            </Card>

        </Col>
    )
}

export default React.memo(Product)
