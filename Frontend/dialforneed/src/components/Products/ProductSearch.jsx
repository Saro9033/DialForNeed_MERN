import React, { Fragment, useContext, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Products, fetchProducts, productError, productStatus } from '../../slices/ProductsSlice';
import MetaData from '../Layouts/MetaData';
import { renderContent } from '../../utils/getContent'; // Import the renderContent function
import Product from '../Products/Product';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import { SidebarContext } from '../../context/SidebarContext';
import { useSnackbar } from 'notistack';

const ProductSearch = () => {
  const data = useSelector(Products);
  const status = useSelector(productStatus);
  const error = useSelector(productError);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const {selectedRatings, selectedType, setKeywordQuery, selectedBrandId, price, priceChanged, selectedCategoryId } = useContext(SidebarContext);

  const { keyword } = useParams();
   console.log(selectedType)
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
    setKeywordQuery(keyword)
    dispatch(fetchProducts({ keyword: keyword, 
      price: priceChanged, categoryId: selectedCategoryId,
       brandId: selectedBrandId, type:selectedType , ratings:selectedRatings}));
  }, [error, dispatch, keyword, priceChanged, selectedCategoryId, selectedBrandId, selectedType,selectedRatings]);

  const renderSuccess = (data) => (
    <Row className='d-flex align-items-start justify-content-center'>
      <Sidebar smallDevice={false} />
      <Col sm={12} md={12} lg={9}>
        <h4  className=" px-3">Search Products</h4>
      
      <div className='d-flex'>   {data.length > 0 ? data.map((product) => (
          <Product lg={4} key={product._id} product={product} />
        )) : <p>No products found in : "{keyword}"</p>}
</div>

      </Col>
    </Row>
  );

  return (
    <Fragment>
      <MetaData title="Search page" />
      <Container id="products">
        {renderContent(status, data, error, renderSuccess)}
      </Container>
    </Fragment>
  );
};

export default ProductSearch;
