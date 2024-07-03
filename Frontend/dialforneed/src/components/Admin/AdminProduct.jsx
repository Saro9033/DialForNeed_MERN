// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { ClearError, ClearIsProductCreated, ClearIsProductUpdated, ClearIsProductDeleted, IsProductCreated, IsProductDeleted, Products, SingleProduct, SingleProductError, SingleProductStatus, adminProducts, createSingleProduct, deleteSingleProduct, productError, productStatus, IsProductUpdated, updateProduct, fetchProductById } from '../../slices/ProductsSlice'
// import { Link } from 'react-router-dom'
// import { FaEdit } from "react-icons/fa";
// import { FaTrashAlt } from "react-icons/fa";
// import { MDBDataTable } from 'mdbreact';
// import { IoIosAddCircle } from "react-icons/io";
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import { Form } from 'react-bootstrap';
// import Spinner from 'react-bootstrap/Spinner';

// import { CategoriesData, categoryStatus, fetchCategory } from '../../slices/CategorySlice';
// import { BrandData, BrandStatus, fetchBrands } from '../../slices/BrandSlice';
// import { useSnackbar } from 'notistack';

// export const AdminProduct = () => {
//     const { enqueueSnackbar } = useSnackbar();

//     const adminProductsData = useSelector(Products)
//     const adminnProductsStatus = useSelector(productStatus)
//     const adminProductsError = useSelector(productError)
//     const dispatch = useDispatch()

//     useEffect(() => {
//         dispatch(adminProducts());
//         dispatch(fetchCategory());
//         dispatch(fetchBrands());
//     }, [dispatch]);

//   //delete Product
//   const deleteHandler = (e, id) => {
//     dispatch(deleteSingleProduct(id))
// }

// //Update Product
// const UpdataHandler = (e, id) => {
//     setModalShow2(true)
//     dispatch(fetchProductById(id))
// }

// console.log(adminProductsData);
//     const setProducts = () => {
//         const data = {
//             columns: [
//                 {
//                     label: 'Name',
//                     field: 'name',
//                     sort: 'asc'
//                 },
//                 {
//                     label: 'Price',
//                     field: 'price',
//                     sort: 'asc'
//                 },
//                 {
//                     label: 'Stock',
//                     field: 'stock',
//                     sort: 'asc'
//                 },
//                 {
//                     label: 'Category',
//                     field: 'category',
//                     sort: 'asc'
//                 },
//                 {
//                     label: 'Brand',
//                     field: 'brand',
//                     sort: 'asc'
//                 },
//                 {
//                     label: 'Type',
//                     field: 'type',
//                     sort: 'asc'
//                 },
//                 {
//                     label: 'Action',
//                     field: 'actions',
//                     sort: 'asc'
//                 }
//             ],
//             rows: []
//         }
//         if (adminProductsData && adminProductsData.length > 0) {

//            adminProductsData?.forEach(product => {
//                 data.rows.push({
//                     name: <>
//                         {product.name}
//                         <br />
//                         <span className='text-secondary' style={{ fontSize: '14px' }}>({product._id})</span>
//                     </>,
//                     price: `₹${product.price}`,
//                     stock: product.stock,
//                     category: product.category,
//                     brand: product.brand,
//                     type: product.type,
//                     actions: <>
//                         <button onClick={(e) => UpdataHandler(e, product?._id)} className='btn btn-primary' ><FaEdit /></button>
//                         <button onClick={e => deleteHandler(e, product?._id)} className='btn btn-danger py-1 px-2 ml-2'><FaTrashAlt /></button>
//                     </>
//                 })
//             })
//         } else {
//             console.log('No Products found.');
//         }

//         return data
//     }

//     const [modalShow, setModalShow] = useState(false);
//     const [modalShow2, setModalShow2] = useState(false);

//     // Product
//     const ProductStatus = useSelector(SingleProductStatus)
//     const Product = useSelector(SingleProduct) ||  {}
//     const ProductError = useSelector(SingleProductError)
//     const ProductCreated = useSelector(IsProductCreated)
//     const ProductUpdated = useSelector(IsProductUpdated)
//     const ProductDeleted = useSelector(IsProductDeleted)

//     //category
//     const Categories = useSelector(CategoriesData)
//     const CategoryStatus = useSelector(categoryStatus)

//     //Brand
//     const Brands = useSelector(BrandData)
//     const brandStatus = useSelector(BrandStatus)


//     //Create new products datas
//     const [name, setName] = useState('')
//     const [price, setPrice] = useState('')
//     const [description, setDesciption] = useState('')
//     const [categoryId, setCategoryId] = useState('')
//     const [brandId, setBrandId] = useState('')
//     const [type, setType] = useState('')
//     const [stock, setStock] = useState(0)
//     const [images, setImages] = useState([])
//     const [imagesPreview, setImagesPreview] = useState([])

    // const onImagesChange = (e) => {
    //     e.preventDefault()
    //     const files = Array.from(e.target.files)

    //   files.length > 0 &&  files.forEach(file => {
    //         const reader = new FileReader();
    //         reader.onload = () => {
    //             if (reader.readyState == 2) {
    //                 setImagesPreview(oldArray => [...oldArray, reader.result])
    //                 setImages(oldArray => [...oldArray, file])
    //             }
    //         }
    //         reader.readAsDataURL(file)
    //     })
    // }



//     const handleProductSubmit = (e) => {
//         e.preventDefault()
//         let formData = new FormData()
//         formData.append('name', name);
//         formData.append('price', price);
//         formData.append('description', description);
//         formData.append('categoryId', categoryId);
//         formData.append('brandId', brandId);
//         formData.append('type', type);
//         formData.append('stock', stock);
//         images.length > 0 &&  images.forEach(image => {
//             formData.append('images', image);
//         })

//         dispatch(createSingleProduct(formData))
//     }


//     useEffect(() => {
//         if (ProductCreated) {
//             enqueueSnackbar("Product Created Successfully!", {
//                 variant: 'success',
//                 anchorOrigin: {
//                     vertical: 'top',
//                     horizontal: 'center',
//                 },
//                 onExited: () => {
//                     dispatch(ClearIsProductCreated());
//                 },
//             })
//             setModalShow(false)
//             setName("")
//             setPrice("")
//             setDesciption("")
//             setImages([])
//             setImagesPreview([])
//             setStock("")
//             setType("")
//             setBrandId("")
//             setCategoryId("")
//             return
//         }

//         if (ProductDeleted) {
//             enqueueSnackbar("Product Deleted Successfully!", {
//                 variant: 'success',
//                 anchorOrigin: {
//                     vertical: 'top',
//                     horizontal: 'center',
//                 },
//                 onExited: () => {
//                     dispatch(ClearIsProductDeleted());
//                 },
//             })
//             return
//         }

//         if (ProductError) {
//             enqueueSnackbar(ProductError, {
//                 variant: 'error',
//                 anchorOrigin: {
//                     vertical: 'top',
//                     horizontal: 'center',
//                 },
//                 onExited: () => {
//                     dispatch(ClearError());
//                 },
//             })
//             return
//         }

//         if (ProductUpdated) {
//             enqueueSnackbar("Product Updated Successfully!", {
//                 variant: 'success',
//                 anchorOrigin: {
//                     vertical: 'top',
//                     horizontal: 'center',
//                 },
//                 onExited: () => {
//                     dispatch(ClearIsProductUpdated());
//                 },
//             })

//             return
//         }

//     }, [ProductCreated, enqueueSnackbar, ProductDeleted, ProductUpdated, ProductError, dispatch])

//     useEffect(() => {
//         if (adminProductsError) {
//             enqueueSnackbar(adminProductsError, {
//                 variant: 'error',
//                 anchorOrigin: {
//                     vertical: 'top',
//                     horizontal: 'center',
//                 },
//                 onExited: () => {
//                     dispatch(ClearError());
//                 },
//             })
//             return
//         }

       
//     }, [dispatch, adminProductsError, enqueueSnackbar])


//     const removeImage = (index) => {
//         setImagesPreview(imagesPreview.filter((_, i) => i !== index));
//         setImages(images.filter((_, i) => i !== index));
//     };


  

//     //Update products datas by admin
//     const [updateName, setUpdateName] = useState('')
//     const [updatePrice, setUpdatePrice] = useState('')
//     const [updateDescription, setUpdateDesciption] = useState('')
//     const [updateCategoryId, setUpdateCategoryId] = useState('')
//     const [updateBrandId, setUpdateBrandId] = useState('')
//     const [updateType, setUpdateType] = useState('')
//     const [updateStock, setUpdateStock] = useState(0)
//     const [updateImages, setUpdateImages] = useState([])
//     // const [updateImagesCleared, setUpdateImagesCleared] = useState(false)
//     const [updateImagesPreview, setUpdateImagesPreview] = useState([])
//     const [imagesToDelete, setImagesToDelete] = useState([]);

    // // Function to handle the removal of an image preview
    // const handleRemoveImage = (imageUrl) => {
    //     setImagesToDelete([...imagesToDelete, imageUrl]);
    //     setUpdateImagesPreview(updateImagesPreview.filter(img => img !== imageUrl));
    // };

//     const updateProductSubmit = (e) => {
//         e.preventDefault()
//         let formData = new FormData()
//         formData.append('name', updateName);
//         formData.append('price', updatePrice);
//         formData.append('description', updateDescription);
//         formData.append('categoryId', updateCategoryId);
//         formData.append('brandId', updateBrandId);
//         formData.append('type', updateType);
//         formData.append('stock', updateStock);
//         // Append the list of images to be deleted
//         if (imagesToDelete.length > 0) {
//             formData.append('imagesToDelete', JSON.stringify(imagesToDelete));
//         }
//         updateImages.length > 0 && updateImages.forEach(image => {
//             formData.append('images', image);
//         })

//         dispatch(updateProduct({ id: Product?._id, formData }))
//     }

//     // const clearedImagesHandler = () => {
//     //     setUpdateImages([]);
//     //     setUpdateImagesPreview([])
//     //     setUpdateImagesCleared(true)
//     // }

    // useEffect(() => {
    //     if (Product) {
    //         setUpdateName(Product?.name ?? '')
    //         setUpdatePrice(Product?.price ?? '')
    //         setUpdateDesciption(Product?.description ?? '')
    //         setUpdateCategoryId(Product?.categoryId ?? '')
    //         setUpdateBrandId(Product?.brandId ?? '')
    //         setUpdateType(Product?.type ?? '')
    //         setUpdateStock(Product?.stock ?? '')
    //         let images = []
    //         Product?.images.length > 0 &&  Product?.images.forEach(image => {
    //             images.push(image.image)
    //         })
    //         setUpdateImagesPreview(images)

    //     }
    // }, [Product])


//     // Ensure state is reset when modal is closed
//     const handleClose = () => {
//         setUpdateImages([]);
//         setUpdateImagesPreview([]);
//         setModalShow2(false);
//     };


    // const handleImageChange = (e) => {
    //     const files = Array.from(e.target.files);

    //     files.length > 0 &&   files.forEach(file => {
    //         setUpdateImages(prevImages => [...prevImages, file]);

    //         const reader = new FileReader();
    //         reader.onload = () => {
    //             if (reader.readyState === 2) {
    //                 setUpdateImagesPreview(prevImages => [...prevImages, reader.result]);
    //             }
    //         };
    //         reader.readAsDataURL(file);
    //     });
    // };

//     return (
        // <div >
        //     <h2>Products</h2>
        //     <>
        //         {adminnProductsStatus === "loading"
        //             ? <div className="d-flex align-items-start justify-content-center"><div className="loader"></div> </div>
        //             :
        //             <>


        //                 <div className=" px-3 my-2 d-flex align-items-start justify-content-start">
        //                     <Button variant="primary" onClick={() => setModalShow(true)}>
        //                         ADD &nbsp; <IoIosAddCircle fontSize='1.5rem' />
        //                     </Button>
        //                 </div>


        //                 <MDBDataTable
        //                     className="px-3"
        //                     bordered
        //                     striped
        //                     hover
        //                     responsive // This makes the table responsive
        //                     data={setProducts()}
        //                 />
        //             </>
        //         }
        //     </>



        //     {/* create new product model */}
        //     <Modal
        //         show={modalShow}
        //         onHide={() => setModalShow(false)}
        //         size="lg"
        //         aria-labelledby="contained-modal-title-vcenter"
        //         centered
        //     >
        //         <Modal.Header closeButton>
        //             <Modal.Title id="contained-modal-title-vcenter">
        //                 Create New Product
        //             </Modal.Title>
        //         </Modal.Header>
        //         <Modal.Body>
        //             <div className="px-2">
        //                 <div >
        //                     <form encType='multipart/form-data' onSubmit={handleProductSubmit}>
        //                         <div className='form-group'>
        //                             <label>Images</label>
        //                             <div className='custom-file'>
        //                                 <input
        //                                     type='file'
        //                                     name='product_images'
        //                                     className='custom-file-input'
        //                                     id='customFile'
        //                                     height="50"
        //                                     width="100"
        //                                     multiple
        //                                     onChange={onImagesChange}
        //                                 />
        //                                 <label className='custom-file-label' for='customFile'>
        //                                     Choose Images
        //                                 </label>
        //                             </div>

        //                             <div className='d-flex '>
        //                                 {imagesPreview.length >0  &&  imagesPreview.map((image, index) => (
        //                                     <div key={index} className='mt-3 mr-5 position-relative'>

        //                                         <img src={image} className='border' key={index} alt={`image  Preview${index}`} height="65" width="65" />

        //                                         <button
        //                                             variant="danger"
        //                                             className='border btn btn-secondary rounded-circle position-absolute top-0 right-0 py-0 px-2'
        //                                             size="md"
        //                                             onClick={() => removeImage(index)}
        //                                         >
        //                                             &times;
        //                                         </button>
        //                                     </div>
        //                                 ))} </div>
        //                         </div>

        //                         <div className="form-group">
        //                             <label htmlFor="name_field">Name</label>
        //                             <input
        //                                 type="text"
        //                                 id="name_field"

        //                                 className="form-control"
        //                                 value={name}
        //                                 onChange={(e) => setName(e.target.value)}
        //                             />
        //                         </div>

        //                         <div className="form-group">
        //                             <label for="price_field">Price</label>
        //                             <input
        //                                 type="text"
        //                                 id="price_field"
        //                                 className="form-control"
        //                                 value={price}
        //                                 onChange={(e) => setPrice(e.target.value)}
        //                             />
        //                         </div>

        //                         <div className="form-group">
        //                             <label for="description_field">Description</label>
        //                             <textarea value={description}
        //                                 onChange={(e) => setDesciption(e.target.value)} className="form-control" id="description_field" rows="8" ></textarea>
        //                         </div>

        //                         <Form.Group controlId="category_field" className="mb-3">
        //                             <Form.Label>Category</Form.Label>
        //                             <Form.Control
        //                                 as="select"
        //                                 value={categoryId}
        //                                 onChange={(e) => setCategoryId(e.target.value)}
        //                             >
        //                                 {Categories.length > 0 ? (
        //                                     Categories.map(category => (
        //                                         <option key={category._id} value={category._id}>
        //                                             {category.title}
        //                                         </option>
        //                                     ))
        //                                 ) : (
        //                                     <option disabled>No categories found</option>
        //                                 )}
        //                             </Form.Control>
        //                         </Form.Group>

        //                         <Form.Group controlId="category_field" className="mb-3">
        //                             <Form.Label>Brand</Form.Label>
        //                             <Form.Control
        //                                 as="select"
        //                                 value={brandId}
        //                                 onChange={(e) => setBrandId(e.target.value)}
        //                             >
        //                                 <option disabled value=''>Select </option>
        //                                 {brandStatus === "loading" ? <Spinner animation="border" role="status">
        //                                     <span className="visually-hidden">Loading...</span>
        //                                 </Spinner> :

        //                                     Brands.length > 0 && Brands?.map((brand) => (
        //                                         <option key={brand._id} value={brand._id}>
        //                                             {brand.title}
        //                                         </option>
        //                                     ))}
        //                             </Form.Control>
        //                         </Form.Group>

        //                         <Form.Group controlId="category_field" className="mb-3">
        //                             <Form.Label>Brand</Form.Label>
        //                             <Form.Control
        //                                 as="select"
        //                                 value={type}
        //                                 onChange={(e) => setType(e.target.value)}>
        //                                 <option value=''>Select </option>
        //                                 <option value='sales'>Sales </option>
        //                                 <option value='service'>Service </option>
        //                             </Form.Control>
        //                         </Form.Group>


        //                         <div className="form-group">
        //                             <label for="stock_field">Stock</label>
        //                             <input
        //                                 type="number"
        //                                 id="stock_field"
        //                                 className="form-control"
        //                                 value={stock}
        //                                 onChange={(e) => setStock(e.target.value)}
        //                             />
        //                         </div>


        //                         <button
        //                             id="login_button"
        //                             type="submit"
        //                             className="btn btn-block py-3 border"
        //                             disabled={ProductStatus === "loading" ? true : false}
        //                         >
        //                             CREATE
        //                         </button>

        //                     </form>
        //                 </div>
        //             </div>
        //         </Modal.Body>
        //     </Modal>


        //     {/* ####################################################################################################################### */}

        //     {/*Update existing product */}
        //     <Modal
        //         show={modalShow2}
        //         onHide={handleClose}
        //         size="lg"

        //         aria-labelledby="contained-modal-title-vcenter"
        //         centered
        //     >
        //         <Modal.Header closeButton>
        //             <Modal.Title id="contained-modal-title-vcenter">
        //                 Update Product
        //             </Modal.Title>
        //         </Modal.Header>
        //         <Modal.Body>
        //             <div className="px-2">
        //                 <div >
        //                     <form encType='multipart/form-data' onSubmit={updateProductSubmit}>
        //                         <div className='form-group'>
        //                             <label>Images</label>
        //                             <div className='custom-file'>
        //                                 <input
        //                                     type='file'
        //                                     name='product_images'
        //                                     className='custom-file-input'
        //                                     id='customFile'
        //                                     height="50"
        //                                     width="100"
        //                                     multiple
        //                                     onChange={handleImageChange}
        //                                 />
        //                                 <label className='custom-file-label' for='customFile'>
        //                                     Choose Images
        //                                 </label>
        //                             </div>



        //                             <div className='d-flex align-items-center'>
        //                                 {updateImagesPreview.length > 0 && updateImagesPreview.map((image, index) => (
        //                                     <div className='mt-3 mr-5 position-relative'>

        //                                         <img src={image} className='border' key={index} alt={`image  Preview${index}`} height="65" width="65" />

        //                                         <button type="button"
        //                                             variant="danger"
        //                                             className='border btn btn-secondary rounded-circle position-absolute top-0 right-0 py-0 px-2'
        //                                             size="md"
        //                                             onClick={() => handleRemoveImage(image)}
        //                                         >
        //                                             &times;
        //                                         </button>
        //                                     </div>
        //                                 ))}
        //                                 {/* {updateImagesPreview.length > 0 &&
        //                                     <span className='mr-2 btn btn-danger' style={{ cursor: 'pointer' }} onClick={clearedImagesHandler}>Delete All&nbsp; <FaTrashAlt fontSize="1.5rem" /></span>} */}


        //                             </div>
        //                         </div>

        //                         <div className="form-group">
        //                             <label for="name_field">Name</label>
        //                             <input
        //                                 type="text"
        //                                 id="name_field"
        //                                 className="form-control"
        //                                 value={updateName}
        //                                 onChange={(e) => setUpdateName(e.target.value)}
        //                             />
        //                         </div>

        //                         <div className="form-group">
        //                             <label for="price_field">Price</label>
        //                             <input
        //                                 type="text"
        //                                 id="price_field"
        //                                 className="form-control"
        //                                 value={updatePrice}
        //                                 onChange={(e) => setUpdatePrice(e.target.value)}
        //                             />
        //                         </div>

        //                         <div className="form-group">
        //                             <label for="description_field">Description</label>
        //                             <textarea value={updateDescription}
        //                                 onChange={(e) => setUpdateDesciption(e.target.value)} className="form-control" id="description_field" rows="8" ></textarea>
        //                         </div>

        //                         <Form.Group controlId="category_field" className="mb-3">
        //                             <Form.Label>Category</Form.Label>
        //                             <Form.Control
        //                                 as="select"
        //                                 value={updateCategoryId}
        //                                 onChange={(e) => setUpdateCategoryId(e.target.value)}
        //                             >
        //                                 <option disabled value=''>Select </option>
        //                                 {CategoryStatus === "loading" ? <Spinner animation="border" role="status">
        //                                     <span className="visually-hidden">Loading...</span>
        //                                 </Spinner> :
        //                                     <>  {
        //                                         Categories.length > 0 && Categories.map((category) => (
        //                                             <option key={category._id} value={category._id}>
        //                                                 {category.title}
        //                                             </option>
        //                                         ))
        //                                     }</>
        //                                 }
        //                             </Form.Control>
        //                         </Form.Group>

        //                         <Form.Group controlId="category_field" className="mb-3">
        //                             <Form.Label>Brand</Form.Label>
        //                             <Form.Control
        //                                 as="select"
        //                                 value={updateBrandId}
        //                                 onChange={(e) => setUpdateBrandId(e.target.value)}
        //                             >
        //                                 <option disabled value=''>Select </option>
        //                                 {brandStatus === "loading" ? <Spinner animation="border" role="status">
        //                                     <span className="visually-hidden">Loading...</span>
        //                                 </Spinner> :

        //                                     Brands.length > 0 && Brands.map((brand) => (
        //                                         <option key={brand._id} value={brand._id}>
        //                                             {brand.title}
        //                                         </option>
        //                                     ))}
        //                             </Form.Control>
        //                         </Form.Group>

        //                         <Form.Group controlId="category_field" className="mb-3">
        //                             <Form.Label>Product Type</Form.Label>
        //                             <Form.Control
        //                                 as="select"
        //                                 value={updateType}
        //                                 onChange={(e) => setUpdateType(e.target.value)}>
        //                                 <option value=''>Select </option>
        //                                 <option value='sales'>Sales </option>
        //                                 <option value='service'>Service </option>
        //                             </Form.Control>
        //                         </Form.Group>


        //                         <div className="form-group">
        //                             <label for="stock_field">Stock</label>
        //                             <input
        //                                 type="number"
        //                                 id="stock_field"
        //                                 className="form-control"
        //                                 value={updateStock}
        //                                 onChange={(e) => setUpdateStock(e.target.value)}
        //                             />
        //                         </div>


        //                         <button
        //                             id="login_button"
        //                             type="submit"
        //                             className="btn btn-block py-3 border"
        //                             disabled={ProductStatus === "loading" ? true : false}
        //                         >
        //                             UPDATE
        //                         </button>

        //                     </form>
        //                 </div>
        //             </div>
        //         </Modal.Body>
        //     </Modal>

        // </div>
//     )
// }

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClearError, ClearIsProductCreated, ClearIsProductUpdated, ClearIsProductDeleted, IsProductCreated, IsProductDeleted, Products, SingleProduct, SingleProductError, SingleProductStatus, adminProducts, createSingleProduct, deleteSingleProduct, productError, productStatus, IsProductUpdated, updateProduct, fetchProductById } from '../../slices/ProductsSlice';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { MDBDataTable } from 'mdbreact';
import { IoIosAddCircle } from "react-icons/io";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

import { CategoriesData, categoryStatus, fetchCategory } from '../../slices/CategorySlice';
import { BrandData, BrandStatus, fetchBrands } from '../../slices/BrandSlice';
import { useSnackbar } from 'notistack';

export const AdminProduct = () => {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    // Redux selectors
    const adminProductsData = useSelector(Products);
    const adminnProductsStatus = useSelector(productStatus);
    const adminProductsError = useSelector(productError);
    const ProductStatus = useSelector(SingleProductStatus);
    const Product = useSelector(SingleProduct) || {};
    const ProductError = useSelector(SingleProductError);
    const ProductCreated = useSelector(IsProductCreated);
    const ProductUpdated = useSelector(IsProductUpdated);
    const ProductDeleted = useSelector(IsProductDeleted);
    const Categories = useSelector(CategoriesData);
    const CategoryStatus = useSelector(categoryStatus);
    const Brands = useSelector(BrandData);
    const brandStatus = useSelector(BrandStatus);

    // State for managing modals and form data
    const [modalShow, setModalShow] = useState(false);
    const [modalShow2, setModalShow2] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [brandId, setBrandId] = useState('');
    const [type, setType] = useState('');
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [updateName, setUpdateName] = useState('');
    const [updatePrice, setUpdatePrice] = useState('');
    const [updateDescription, setUpdateDescription] = useState('');
    const [updateCategoryId, setUpdateCategoryId] = useState('');
    const [updateBrandId, setUpdateBrandId] = useState('');
    const [updateType, setUpdateType] = useState('');
    const [updateStock, setUpdateStock] = useState(0);
    const [updateImages, setUpdateImages] = useState([]);
    const [updateImagesPreview, setUpdateImagesPreview] = useState([]);
    const [imagesToDelete, setImagesToDelete] = useState([]);

    // Fetch initial data on component mount
    useEffect(() => {
        dispatch(adminProducts());
        dispatch(fetchCategory());
        dispatch(fetchBrands());
    }, [dispatch]);

    // Function to handle image upload and preview for new product
    const handleImagesChange = (e) => {
        e.preventDefault();
        const files = Array.from(e.target.files);

        files.length > 0 && files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result]);
                    setImages(oldArray => [...oldArray, file]);
                }
            };
            reader.readAsDataURL(file);
        });
    };
console.log(Categories)
    // Function to remove image preview for new product
    const removeImage = (index) => {
        setImagesPreview(imagesPreview.filter((_, i) => i !== index));
        setImages(images.filter((_, i) => i !== index));
    };

    // Function to handle image upload and preview for product update
    const handleUpdateImagesChange = (e) => {
        const files = Array.from(e.target.files);

        files.length > 0 && files.forEach(file => {
            setUpdateImages(prevImages => [...prevImages, file]);

            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setUpdateImagesPreview(prevImages => [...prevImages, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    // Function to handle removal of image preview for product update
    const handleRemoveUpdateImage = (imageUrl) => {
        setImagesToDelete([...imagesToDelete, imageUrl]);
        setUpdateImagesPreview(updateImagesPreview.filter(img => img !== imageUrl));
    };

    // Function to reset state and close update product modal
    const handleClose = () => {
        setUpdateName('');
        setUpdatePrice('');
        setUpdateDescription('');
        setUpdateCategoryId('');
        setUpdateBrandId('');
        setUpdateType('');
        setUpdateStock(0);
        setUpdateImages([]);
        setUpdateImagesPreview([]);
        setModalShow2(false);
    };

    // Function to handle form submission for creating a new product
    const handleProductSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('categoryId', categoryId);
        formData.append('brandId', brandId);
        formData.append('type', type);
        formData.append('stock', stock);
        images.length > 0 && images.forEach(image => {
            formData.append('images', image);
        });

        dispatch(createSingleProduct(formData));
    };

    // Function to handle form submission for updating an existing product
    const updateProductSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('name', updateName);
        formData.append('price', updatePrice);
        formData.append('description', updateDescription);
        formData.append('categoryId', updateCategoryId);
        formData.append('brandId', updateBrandId);
        formData.append('type', updateType);
        formData.append('stock', updateStock);
        // Append the list of images to be deleted
        if (imagesToDelete.length > 0) {
            formData.append('imagesToDelete', JSON.stringify(imagesToDelete));
        }
        updateImages.length > 0 && updateImages.forEach(image => {
            formData.append('images', image);
        });

        dispatch(updateProduct({ id: Product?._id, formData }));
    };

    // Effect to handle success and error notifications
    useEffect(() => {
        if (ProductCreated) {
            enqueueSnackbar("Product Created Successfully!", { variant: 'success',  
             anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
              } });
            setModalShow(false);
            clearFormFields();
            dispatch(ClearIsProductCreated());
            dispatch(adminProducts());
            return
        }

        if (ProductDeleted) {
            enqueueSnackbar("Product Deleted Successfully!", { variant: 'success',  
            anchorOrigin: {
               vertical: 'top',
               horizontal: 'center',
             } });
            dispatch(ClearIsProductDeleted());
            dispatch(adminProducts());
            return
        }

        if (ProductUpdated) {
            enqueueSnackbar("Product Updated Successfully!", { variant: 'success',  
            anchorOrigin: {
               vertical: 'top',
               horizontal: 'center',
             } });
            handleClose();
            dispatch(ClearIsProductUpdated());
            dispatch(adminProducts());
            return
        }

        if (ProductError) {
            enqueueSnackbar(ProductError, { variant: 'error',  
            anchorOrigin: {
               vertical: 'top',
               horizontal: 'center',
             } });
            dispatch(ClearError());
            return
        }

        if (adminProductsError) {
            enqueueSnackbar(adminProductsError, { variant: 'error',  
            anchorOrigin: {
               vertical: 'top',
               horizontal: 'center',
             } });
            dispatch(ClearError());
            return
        }
    }, [ProductCreated, ProductDeleted, ProductUpdated, ProductError, adminProductsError, dispatch, enqueueSnackbar]);

    // Function to clear form fields
    const clearFormFields = () => {
        setName('');
        setPrice('');
        setDescription('');
        setCategoryId('');
        setBrandId('');
        setType('');
        setStock(0);
        setImages([]);
        setImagesPreview([]);
    };

    // Function to handle delete product action
    const deleteHandler = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            dispatch(deleteSingleProduct(id));
            dispatch(adminProducts());

        }
    };

    // Function to handle update product action
    const updateHandler = (id) => {
        setModalShow2(true);
        dispatch(fetchProductById(id));
    };

    // Function to set up DataTable data
    const setProducts = () => {
        const data = {
            columns: [
                { label: 'Name', field: 'name', sort: 'asc' },
                { label: 'Price', field: 'price', sort: 'asc' },
                { label: 'Stock', field: 'stock', sort: 'asc' },
                { label: 'Category', field: 'category', sort: 'asc' },
                { label: 'Brand', field: 'brand', sort: 'asc' },
                { label: 'Type', field: 'type', sort: 'asc' },
                { label: 'Action', field: 'actions', sort: 'asc' }
            ],
            rows: []
        };

        if (adminProductsData && adminProductsData.length > 0) {
            adminProductsData.forEach(product => {
                data.rows.push({
                    name: (
                        <>
                            {product.name}
                            <br />
                            <span className='text-secondary' style={{ fontSize: '14px' }}>({product._id})</span>
                        </>
                    ),
                    price: `₹${product.price}`,
                    stock: product.stock,
                    category: product.category,
                    brand: product.brand,
                    type: product.type,
                    actions: (
                        <>
                            <Button variant='info' size='sm' className='mr-2' onClick={() => updateHandler(product._id)}>
                                <FaEdit />
                            </Button>
                            <Button variant='danger' size='sm' onClick={() => deleteHandler(product._id)}>
                                <FaTrashAlt />
                            </Button>
                        </>
                    )
                });
            });
        }

        return data;
    };
    const onImagesChange = (e) => {
        e.preventDefault()
        const files = Array.from(e.target.files)

      files.length > 0 &&  files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState == 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, file])
                }
            }
            reader.readAsDataURL(file)
        })
    }

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        files.length > 0 &&   files.forEach(file => {
            setUpdateImages(prevImages => [...prevImages, file]);

            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setUpdateImagesPreview(prevImages => [...prevImages, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    useEffect(() => {
        if (Product) {
            setUpdateName(Product?.name ?? '')
            setUpdatePrice(Product?.price ?? '')
            setUpdateDescription(Product?.description ?? '')
            setUpdateCategoryId(Product?.categoryId ?? '')
            setUpdateBrandId(Product?.brandId ?? '')
            setUpdateType(Product?.type ?? '')
            setUpdateStock(Product?.stock ?? '')
            let images = []
            Product?.images?.length > 0 &&  Product?.images.forEach(image => {
                images.push(image.image)
            })
            setUpdateImagesPreview(images)

        }
    }, [Product])


    // Function to handle the removal of an image preview
    const handleRemoveImage = (imageUrl) => {
        setImagesToDelete([...imagesToDelete, imageUrl]);
        setUpdateImagesPreview(updateImagesPreview.filter(img => img !== imageUrl));
    };

    return (
        <div >
        <h2>Products</h2>
        <>
            {adminnProductsStatus === "loading"
                ? <div className="d-flex align-items-start justify-content-center"><div className="loader"></div> </div>
                :
                <>
                    <div className=" px-3 my-2 d-flex align-items-start justify-content-start">
                        <Button variant="primary" onClick={() => setModalShow(true)}>
                            ADD &nbsp; <IoIosAddCircle fontSize='1.5rem' />
                        </Button>
                    </div>


                    <MDBDataTable
                        className="px-3"
                        bordered
                        striped
                        hover
                        responsive // This makes the table responsive
                        data={setProducts()}
                    />
                </>
            }
        </>



        {/* create new product model */}
        <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create New Product
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="px-2">
                    <div >
                        <form encType='multipart/form-data' onSubmit={handleProductSubmit}>
                            <div className='form-group'>
                                <label>Images</label>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='product_images'
                                        className='custom-file-input'
                                        id='customFile'
                                        height="50"
                                        width="100"
                                        multiple
                                        onChange={onImagesChange}
                                    />
                                    <label className='custom-file-label' for='customFile'>
                                        Choose Images
                                    </label>
                                </div>

                                <div className='d-flex '>
                                    {imagesPreview.length >0  &&  imagesPreview.map((image, index) => (
                                        <div key={index} className='mt-3 mr-5 position-relative'>

                                            <img src={image} className='border' key={index} alt={`image  Preview${index}`} height="65" width="65" />

                                            <button
                                                variant="danger"
                                                className='border btn btn-secondary rounded-circle position-absolute top-0 right-0 py-0 px-2'
                                                size="md"
                                                onClick={() => removeImage(index)}
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))} </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="name_field">Name</label>
                                <input
                                    type="text"
                                    id="name_field"

                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label for="price_field">Price</label>
                                <input
                                    type="text"
                                    id="price_field"
                                    className="form-control"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label for="description_field">Description</label>
                                <textarea value={description}
                                    onChange={(e) => setDescription(e.target.value)} className="form-control" id="description_field" rows="8" ></textarea>
                            </div>

                            <Form.Group controlId="category_field" className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(e.target.value)}
                                >
                               <option disabled value=''>Select </option>
                                    {Categories.length > 0 ? (
                                        Categories.map(category => (
                                            <option key={category._id} value={category._id}>
                                                {category.title}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>No categories found</option>
                                    )}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="category_field" className="mb-3">
                                <Form.Label>Brand</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={brandId}
                                    onChange={(e) => setBrandId(e.target.value)}
                                >
                                    <option disabled value=''>Select </option>
                                    {brandStatus === "loading" ? <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner> :

                                        Brands.length > 0 && Brands?.map((brand) => (
                                            <option key={brand._id} value={brand._id}>
                                                {brand.title}
                                            </option>
                                        ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="category_field" className="mb-3">
                                <Form.Label>Type</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}>
                                    <option value=''>Select </option>
                                    <option value='sales'>Sales </option>
                                    <option value='service'>Service </option>
                                </Form.Control>
                            </Form.Group>


                            <div className="form-group">
                                <label for="stock_field">Stock</label>
                                <input
                                    type="number"
                                    id="stock_field"
                                    className="form-control"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                />
                            </div>


                            <button
                                id="login_button"
                                type="submit"
                                className="btn btn-block py-3 border"
                                disabled={ProductStatus === "loading" ? true : false}
                            >
                                CREATE
                            </button>

                        </form>
                    </div>
                </div>
            </Modal.Body>
        </Modal>


        {/* ####################################################################################################################### */}

        {/*Update existing product */}
        <Modal
            show={modalShow2}
            onHide={handleClose}
            size="lg"

            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update Product
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="px-2">
                    <div >
                        <form encType='multipart/form-data' onSubmit={updateProductSubmit}>
                            <div className='form-group'>
                                <label>Images</label>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='product_images'
                                        className='custom-file-input'
                                        id='customFile'
                                        height="50"
                                        width="100"
                                        multiple
                                        onChange={handleImageChange}
                                    />
                                    <label className='custom-file-label' for='customFile'>
                                        Choose Images
                                    </label>
                                </div>



                                <div className='d-flex align-items-center'>
                                    {updateImagesPreview.length > 0 && updateImagesPreview.map((image, index) => (
                                        <div key={index} className='mt-3 mr-5 position-relative'>

                                            <img src={image} className='border' key={index} alt={`image  Preview${index}`} height="65" width="65" />

                                            <button type="button"
                                                variant="danger"
                                                className='border btn btn-secondary rounded-circle position-absolute top-0 right-0 py-0 px-2'
                                                size="md"
                                                onClick={() => handleRemoveImage(image)}
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                    {/* {updateImagesPreview.length > 0 &&
                                        <span className='mr-2 btn btn-danger' style={{ cursor: 'pointer' }} onClick={clearedImagesHandler}>Delete All&nbsp; <FaTrashAlt fontSize="1.5rem" /></span>} */}

                                </div>
                            </div>

                            <div className="form-group">
                                <label for="name_field">Name</label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className="form-control"
                                    value={updateName}
                                    onChange={(e) => setUpdateName(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label for="price_field">Price</label>
                                <input
                                    type="text"
                                    id="price_field"
                                    className="form-control"
                                    value={updatePrice}
                                    onChange={(e) => setUpdatePrice(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label for="description_field">Description</label>
                                <textarea value={updateDescription}
                                    onChange={(e) => setUpdateDesciption(e.target.value)} className="form-control" id="description_field" rows="8" ></textarea>
                            </div>

                            <Form.Group controlId="category_field" className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={updateCategoryId}
                                    onChange={(e) => setUpdateCategoryId(e.target.value)}
                                >
                                    <option disabled value=''>Select </option>
                                    {CategoryStatus === "loading" ? <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner> :
                                        <>  {
                                            Categories.length > 0 && Categories.map((category) => (
                                                <option key={category._id} value={category._id}>
                                                    {category.title}
                                                </option>
                                            ))
                                        }</>
                                    }
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="category_field" className="mb-3">
                                <Form.Label>Brand</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={updateBrandId}
                                    onChange={(e) => setUpdateBrandId(e.target.value)}
                                >
                                    <option disabled value=''>Select </option>
                                    {brandStatus === "loading" ? <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner> :

                                        Brands.length > 0 && Brands.map((brand) => (
                                            <option key={brand._id} value={brand._id}>
                                                {brand.title}
                                            </option>
                                        ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="category_field" className="mb-3">
                                <Form.Label>Product Type</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={updateType}
                                    onChange={(e) => setUpdateType(e.target.value)}>
                                    <option value=''>Select </option>
                                    <option value='sales'>Sales </option>
                                    <option value='service'>Service </option>
                                </Form.Control>
                            </Form.Group>


                            <div className="form-group">
                                <label for="stock_field">Stock</label>
                                <input
                                    type="number"
                                    id="stock_field"
                                    className="form-control"
                                    value={updateStock}
                                    onChange={(e) => setUpdateStock(e.target.value)}
                                />
                            </div>


                            <button
                                id="login_button"
                                type="submit"
                                className="btn btn-block py-3 border"
                                disabled={ProductStatus === "loading" ? true : false}
                            >
                                UPDATE
                            </button>

                        </form>
                    </div>
                </div>
            </Modal.Body>
        </Modal>

    </div>
    );
};
export default AdminProduct;


