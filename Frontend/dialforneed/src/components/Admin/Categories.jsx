import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CategoriesData, ClearCategoryError, ClearIsCreated, ClearIsDeleted, ClearIsUpdated, IsCreated, IsDeleted, IsUpdated, categoryError, categoryStatus, createCategory, deleteCategory, fetchCategory, updateCategory } from '../../slices/CategorySlice';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { MDBDataTable } from 'mdbreact';
import { IoIosAddCircle } from "react-icons/io";
import { useSnackbar } from 'notistack';
import { Row, Col, Button } from 'react-bootstrap';
import addImage from '../../assets/add-image.png'
import Modal from 'react-bootstrap/Modal';

const Categories = () => {
    const categories = useSelector(CategoriesData);
    const status = useSelector(categoryStatus);
    const error = useSelector(categoryError);
    const isCreated = useSelector(IsCreated);
    const isUpdated = useSelector(IsUpdated);
    const isDeleted = useSelector(IsDeleted);
    const [showModal, setShowModal] = React.useState(false);

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [newCategory, setNewCategory] = useState('');
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [updateValue, setUpdateValue] = useState('')


    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState(addImage);

    // Effect to handle category creation status and errors
    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' ,  
            anchorOrigin: {
               vertical: 'top',
               horizontal: 'center',
             }});
            dispatch(ClearCategoryError());
            return
        }

        if (isCreated) {
            enqueueSnackbar("Category Added", { variant: 'success',  
            anchorOrigin: {
               vertical: 'top',
               horizontal: 'center',
             } });
            dispatch(ClearIsCreated());
            dispatch(fetchCategory());
            return
        }

        if (isUpdated) {
            enqueueSnackbar("Category Updated", { variant: 'success',  
            anchorOrigin: {
               vertical: 'top',
               horizontal: 'center',
             } });
            dispatch(ClearIsUpdated()); // Make sure to clear the isUpdated flag
            dispatch(fetchCategory());
            return
        }

        if (isDeleted) {
            enqueueSnackbar("Category Deleted", { variant: 'success' ,  
            anchorOrigin: {
               vertical: 'top',
               horizontal: 'center',
             }});
            dispatch(ClearIsDeleted()); // Make sure to clear the isUpdated flag
            dispatch(fetchCategory());
            return
        }

        dispatch(fetchCategory());

    }, [dispatch, error, enqueueSnackbar, isCreated, isUpdated, isDeleted]);

    const handleCategoryAdd = async (e) => {
        e.preventDefault();
        let formData = new FormData()
        formData.append('title', newCategory)
        formData.append('image', avatar)
        await dispatch(createCategory(formData));
        setNewCategory('');
        setAvatar('')
        setAvatarPreview(addImage)
        setShowModal(false)
    };

    const handleEdit = (categoryId) => {
        setEditingCategoryId(categoryId);
        const Value = categories.find(cat => cat._id === categoryId);
        setNewCategory(Value?.title)
        setAvatarPreview(Value?.image)
    };

    const handleUpdate = async (categoryId) => {
        let formData = new FormData()
        formData.append('title', newCategory)
        // Check if avatar is not empty before appending to formData
        if (avatar) {
            formData.append('image', avatar);
        } await dispatch(updateCategory({ id: categoryId, formData }));
        setEditingCategoryId(null); // Exit edit mode after update
    };

    const onChangeFunc = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(e.target.files[0]);
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            dispatch(deleteCategory(id));
        }
    }

    const setCategories = () => {
        const data = {
            columns: [
                { label: 'Image', field: 'image', sort: 'asc' },
                { label: 'Categories', field: 'name', sort: 'asc' },
                { label: 'Actions', field: 'actions', sort: 'asc' },
            ],
            rows: [],
        };

        categories.forEach((cat, index) => {
            data.rows.push({
                image: editingCategoryId === cat._id ? (
                    <div className="file-upload-container d-flex align-items-center justify-content-center">
                        <input type="file" name="avatar" id="avatarInput" onChange={onChangeFunc} style={{ display: 'none' }} />
                        <label htmlFor="avatarInput" className="label">
                            <figure className="personal-figure">
                                <img src={avatarPreview} width="80%" className="personal-avatar" alt="avatar" />
                            </figure>
                            {/* <div className="d-flex align-items-center justify-content-center">
                                <button onClick={() => setAvatarPreview(addImage)} className='mt-2 btn btn-outline-danger d-flex' type="button"><FaTrashAlt fontSize="1rem"/></button>
                            </div> */}
                        </label>
                    </div>
                ) : (
                    <img src={cat?.image} width='50' />
                ),
                name: editingCategoryId === cat._id ? (
                    <input
                        type="text"
                        value={newCategory} // Bind to updatedTitle when editing
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="form-control"
                    />
                ) : (
                    cat.title
                ),
                actions: (
                    editingCategoryId === cat._id ? (
                        <button
                            onClick={() => handleUpdate(cat._id)}
                            className="btn btn-primary"
                        >
                            Update
                        </button>
                    ) : (
                        <>
                            <button onClick={() => handleEdit(cat._id)} className="btn btn-primary"> <FaEdit />  </button>
                            <button onClick={() => handleDelete(cat._id)} className='btn btn-danger py-1 px-2 ml-2'><FaTrashAlt /></button>
                        </>
                    )
                ),
            });
        });

        return data;
    };

    const handleClearAndShow = () =>{
        setNewCategory('')
        setAvatar(null)
        setAvatarPreview(addImage)
        setShowModal(true)
    }
    return (
        <div>
            {status === 'loading' ? (
                <div className="d-flex align-items-start justify-content-center">
                    <div className="loader"></div>
                </div>
            ) : status === 'succeeded' && categories.length === 0 ? (
                <>
                    <h1>No Categories Placed</h1>
                    <Button onClick={handleClearAndShow}>Add</Button>
                </>
            ) : (
                <>
                    <Row className="mt-4">
                        <Col xs={6}>
                            <h2>All Categories</h2>
                        </Col>
                        <Col xs={6}>   <Button onClick={handleClearAndShow}>Add</Button>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <div className="table-responsive">
                                <MDBDataTable
                                    className="px-3"
                                    bordered
                                    striped
                                    hover
                                    searching={false}
                                    responsive
                                    data={setCategories()}
                                />
                            </div>
                        </Col>
                    </Row>
                </>
            )}

            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Carousel
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className='w-100 mb-3'>
                        <form onSubmit={handleCategoryAdd}>
                            <div className="file-upload-container d-flex align-items-center justify-content-center">
                                <input type="file" name="avatar" id="avatarInput" onChange={onChangeFunc} style={{ display: 'none' }} />
                                <label htmlFor="avatarInput" className="label">

                                    <figure className="personal-figure">
                                        <img src={avatarPreview} width="100%" height="200px" className="personal-avatar" alt="avatar" />
                                    </figure>
                                    <div className="d-flex align-items-center justify-content-center">
                                        <button onClick={() => setAvatarPreview(addImage)} className='mt-2 btn btn-outline-danger d-flex' type="button">Remove</button>
                                    </div>
                                </label>
                            </div>

                            <label >Category Name</label>
                            <input className='form-control' type="text" placeholder='Type category name' value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />

                            <Button disabled={status==="loading"} type="submit" variant="primary" className='w-100 mt-5'>
                                Add Category
                                <IoIosAddCircle fontSize='1.5rem' />
                            </Button>

                        </form>
                    </Row>
                </Modal.Body>

            </Modal>

        </div>
    );
};

export default Categories;
