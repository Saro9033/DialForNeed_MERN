import React, { Fragment, useEffect, useState, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Products, fetchProducts, productError, productStatus } from '../slices/ProductsSlice';
import MetaData from './Layouts/MetaData';
import { renderContent } from '../utils/getContent'; // Import the renderContent function
import Product from './Products/Product';
import { CarouselData, fetchCarousels } from '../slices/CarouselSlice';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { CategoriesData, fetchCategory } from '../slices/CategorySlice';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
    const data = useSelector(Products);
    const status = useSelector(productStatus);
    const error = useSelector(productError);
    const Carousels = useSelector(CarouselData)
    const Categories = useSelector(CategoriesData)
    const dispatch = useDispatch();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        dispatch(fetchCarousels())
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        dispatch(fetchCategory())
        
        dispatch(fetchProducts({ keyword: null, price: null, categoryId: null, type: null, ratings: null }));
    }, [dispatch]);


    const settings = {
        infinite: true,
        slidesToShow: windowWidth < 900 ? 1 : 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };
    const renderSuccess = (data) => (
        <Row className='d-flex align-items-center '>
            {data && data.map((product) => (
                <Product lg={3} key={product._id} product={product} />
            ))}
        </Row>
    );

  
console.log(Carousels)
    return (
        <Fragment >
            <MetaData title="Home" />
            <Container id="products" className="pt-2" style={{ minHeight: '100vh', backgroundColor: "#FCFCFC" }}>
                {Carousels && Carousels.length > 2 ? (
                    <Slider {...settings}>
                        {Carousels.map((carousel, index) => (
                            <Link to={carousel.link} key={carousel._id} className={`mr-3 w-100 `}>
                                <img
                                style={{height:windowWidth<490 ? '150px': windowWidth<990 ? '200px' : 'auto', objectFit:'cover'}}
                                    className="rounded-2 w-100"
                                    src={carousel.image}
                                    alt="Carousel slide"
                                />
                            </Link>
                        ))}
                    </Slider>
                ) : ''}
                {Categories && Categories.length > 0 ?
                    <>    <div className='d-flex align-items-center justify-content-between'>
                        <span>Category </span>
                        <Link to={`/categories`} style={{ color: 'unset', textDecoration: 'none' }}><IoIosArrowForward /></Link>
                    </div>
                        <Row className={`d-flex flex-wrap ${windowWidth<990 ? 'justify-content-start' : 'justify-content-between' }`}>
                            {Categories.slice(0,8).map(category => (
                               <Col key={category._id} xs={3} md={2} lg={2} xl={1} className="mt-2 d-flex align-items-center justify-content-center flex-column"> 
                               <Link to={`/cateogry-products/${category?._id}`}  style={{textDecoration:'none', color:'none'}}  className='border rounded-circle p-2 d-flex '>
                                    <img width="40" height="40" src={category?.image} alt={category?.image}  />
                                </Link>
                                <span className="pt-2 text-center"style={{fontSize:'14px'}}>{category?.title}</span>
                                </Col>
                            ))
                            }
                        </Row>
                    </>
                    : ''
                }

                {renderContent(status, data, error, renderSuccess)}
            </Container>
        </Fragment>
    );
};

export default Home;
