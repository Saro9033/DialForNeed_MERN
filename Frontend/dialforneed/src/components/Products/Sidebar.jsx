import React, { useContext, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Tooltip from 'rc-tooltip';
import { CiFilter } from "react-icons/ci";
import { CategoriesData, categoryError, categoryStatus, fetchCategory } from '../../slices/CategorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { SidebarContext } from '../../context/SidebarContext';
import { BrandData, BrandError, BrandStatus, fetchBrands } from '../../slices/BrandSlice';
import Filters from '../../utils/Filters';
import StarRating from '../../utils/StartRating';
import { Products } from '../../slices/ProductsSlice';

const Sidebar = ({ smallDevice }) => {
    const dispatch = useDispatch();
    const { selectedType, setSelectedType,
        selectedRatings, setSelectedRatings,
        selectedBrandId, setSelectedBrandId,
        price, setPrice, setPriceChanged,
        selectedCategoryId, setSelectedCategoryId } = useContext(SidebarContext);

    // Fetch categories and brands
    const categoriesData = useSelector(CategoriesData);
    const CategoryError = useSelector(categoryError);
    const CategoryStatus = useSelector(categoryStatus);
    const data = useSelector(Products);

    const brandData = useSelector(BrandData);
    const brandError = useSelector(BrandError);
    const brandStatus = useSelector(BrandStatus);

    const types = ["sales", "service"];

    useEffect(() => {
        dispatch(fetchCategory());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchBrands());
    }, [dispatch]);

    const marks = {
        1000: '₹1000',
        10000: '₹10,000',
        20000: '₹20,000',
        50000: '₹50,000',
    };

    const handleCheckboxChange = (categoryId) => {
        setSelectedCategoryId((prevId) => (prevId === categoryId ? null : categoryId));
    };

    const handleCheckboxBrand = (brandId) => {
        setSelectedBrandId((prevId) => (prevId === brandId ? null : brandId));
    };

    const handleCheckboxType = (type) => {
        setSelectedType((prev) => (prev === type ? null : type));
    };

    const handleCheckboxRating = (rate) => {
        setSelectedRatings((prev) => (prev === rate ? null : rate));
    };

    return (
        <Col lg={3} md={12} sm={12} xs={12}  style={{display:!smallDevice && 'static',top:!smallDevice && '0px' }}
        className={`py-2 ${smallDevice ? '' : 'my-4 d-none border d-lg-block'}`}>
            {!smallDevice && <>
                <h5 className='m-0 pb-0 mb-0'>Filters <CiFilter /> </h5>
                <hr />
            </>}
            <h6>Price</h6>
            <p style={{ fontWeight: '600', fontSize: '14px' }}>₹{price[0]} - ₹{price[1]}</p>
            <div className='px-4 py-1 border rounded-3 w-100' onMouseUp={() => setPriceChanged(price)}>
                <Slider 
                    className="w-100"
                    min={1000}
                    max={50000}
                    defaultValue={price}
                    onAfterChange={(price) => setPrice(price)}
                    range={true}
                    marks={marks}
                    handleRender={
                        renderProps => (
                            <Tooltip
                                placement="top"
                                overlay={`${renderProps.props['aria-valuenow']}`}>
                                <div {...renderProps.props}></div>
                            </Tooltip>
                        )
                    }
                />
            </div>
            <hr className='mt-5 mb-4' />
            <h6>Category</h6>
            {CategoryStatus === 'loading' && <p>Loading categories...</p>}
            {CategoryStatus === 'failed' && <p>Error: {CategoryError}</p>}
            {CategoryStatus === 'succeeded' && (
                <ul className='pl-0'>
                    {categoriesData.map((category) => (
                        <Filters
                            key={category._id}
                            item={category}
                            isSelected={selectedCategoryId === category._id}
                            onCheckboxChange={handleCheckboxChange}
                        />
                    ))}
                </ul>
            )}

            <hr className='mt-3 mb-4' />
            <h6>Brand</h6>
            {brandStatus === 'loading' && <p>Loading Brands...</p>}
            {brandStatus === 'failed' && <p>Error: {brandError}</p>}
            {brandStatus === 'succeeded' && (
                <ul className='pl-0'>
                    {brandData.map((brand) => (
                        <Filters
                            key={brand._id}
                            item={brand}
                            isSelected={selectedBrandId === brand._id}
                            onCheckboxChange={handleCheckboxBrand}
                        />
                    ))}
                </ul>
            )}

            <hr className='mt-3 mb-4' />
            <h6>Types</h6>
            {types && (
                <ul className='pl-0'>
                    {types.map((type, index) => (
                        <li key={index} className='d-flex align-items-center' style={{ cursor: 'pointer', listStyleType: 'none' }}>
                            <input
                                type="checkbox"
                                checked={selectedType === type}
                                onChange={() => handleCheckboxType(type)}
                            /> &nbsp; {type}
                        </li>
                    ))}
                </ul>
            )}
            <hr className='mt-3 mb-4' />
            <h6>Ratings</h6>
            <ul className='pl-0'>
                {[5, 4, 3, 2, 1].map((rating, index) => (
                    <li key={index} className='d-flex align-items-center' style={{ cursor: 'pointer', listStyleType: 'none' }}>
                        <input
                            type="checkbox"
                            checked={selectedRatings === rating}
                            onChange={() => handleCheckboxRating(rating)}
                        /> &nbsp; <StarRating rating={rating} empty={true}/>
                    </li>
                ))}
            </ul>
            <hr className='mt-3 mb-4' />

Total Products : {data.length}
        </Col>
    );
};

export default React.memo(Sidebar);
