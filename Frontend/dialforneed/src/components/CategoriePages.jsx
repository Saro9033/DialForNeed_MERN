import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CategoriesData, categoryError, categoryStatus, fetchCategory } from '../slices/CategorySlice';
import MetaData from './Layouts/MetaData';
import Product from './Products/Product';

const CategoriePages = () => {
  const Categories = useSelector(CategoriesData)
  const CategoryError = useSelector(categoryError)
  const CategoryStatus = useSelector(categoryStatus)

  const dispatch = useDispatch();


  useEffect(() => {

    dispatch(fetchCategory())
  }, [dispatch])


  return (
    <div>
      <MetaData title="Categories"/>
      {CategoryStatus === "loading" ?

        <div className="d-flex align-items-start justify-content-center"><div className="loader"></div> </div>
        :
        CategoryError ? <span>{CategoryError} </span> :

          (Categories && Categories.length > 0) &&
          <div className='row'>
            <h3 className='my-1'>All Categories</h3>
          
          {
            Categories.map(category=>(
              <Product lg={3} key={category._id} category={category} isCategory={true} />
            ))
          }
          </div>

      }
    </div>
  )
}

export default CategoriePages