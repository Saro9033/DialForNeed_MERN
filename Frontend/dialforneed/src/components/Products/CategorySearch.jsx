import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { CategoriesData, fetchCategory } from '../../slices/CategorySlice'
import { Products, fetchProducts, productError, productStatus } from '../../slices/ProductsSlice'
import { useSnackbar } from 'notistack'
import Product from './Product'
import { Container } from 'react-bootstrap'

const CategorySearch = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [categoryName, setCategoryName] = useState('')
    const Allcategories = useSelector(CategoriesData)
    const data = useSelector(Products);
    const status = useSelector(productStatus);
    const error = useSelector(productError);
    const { enqueueSnackbar } = useSnackbar();

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
        if (id) {
            dispatch(fetchCategory())
            setCategoryName(Allcategories?.find(cat => cat._id === id)?.title)
        }
        dispatch(fetchProducts({ categoryId: id, isOnlyCategory: true }))
    }, [dispatch, id, error])


    return (
        < >
            {status === "loading"
                ?
                <div className="d-flex align-items-start justify-content-center"><div className="loader"></div> </div>
                :

                (data && data.length > 0) ?
                    <> <h2 className="mt-3">{categoryName} Products</h2>
                        <div className="d-flex">
                            {data.map(product => (
                                <Product lg={3} key={product._id} product={product} />
                            ))}
                        </div>
                    </> :
                    <p>No products found in {categoryName} category</p>
            }</>
    )
}

export default CategorySearch