import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrandData, BrandError, BrandStatus, ClearBrandError,  ClearIsCreated, ClearIsDeleted, ClearIsUpdated, IsCreated, IsDeleted, IsUpdated,  createBrand, deleteBrand,  fetchBrands, updateBrand } from '../../slices/BrandSlice';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { MDBDataTable } from 'mdbreact';
import { IoIosAddCircle, IoIosReturnLeft } from "react-icons/io";
import { useSnackbar } from 'notistack';
import { Row, Col, Button } from 'react-bootstrap';

const Brands = () => {
    const brands = useSelector(BrandData);
    const status = useSelector(BrandStatus);
    const error = useSelector(BrandError);
    const isCreated = useSelector(IsCreated);
    const isUpdated = useSelector(IsUpdated);
    const isDeleted = useSelector(IsDeleted);

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [newBrand, setNewBrand] = useState('');
    const [editingBrandId, setEditingBrandId] = useState(null); 
    const [updateValue, setUpdateValue] = useState('')

    // Effect to handle category creation status and errors
    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error',  
            anchorOrigin: {
               vertical: 'top',
               horizontal: 'center',
             } });
            dispatch(ClearBrandError());
            return
        }

        if (isCreated) {
            enqueueSnackbar("Brand Added", { variant: 'success',  
            anchorOrigin: {
               vertical: 'top',
               horizontal: 'center',
             } });
            dispatch(ClearIsCreated());
            dispatch(fetchBrands());
            return
        }

        if (isUpdated) {
            enqueueSnackbar("Brand Updated", { variant: 'success',  
            anchorOrigin: {
               vertical: 'top',
               horizontal: 'center',
             } });
            dispatch(ClearIsUpdated()); // Make sure to clear the isUpdated flag
            dispatch(fetchBrands());
            IoIosReturnLeft
        }

        if (isDeleted) {
            enqueueSnackbar("Category Deleted", { variant: 'success',  
            anchorOrigin: {
               vertical: 'top',
               horizontal: 'center',
             } });
            dispatch(ClearIsDeleted()); // Make sure to clear the isUpdated flag
            dispatch(fetchBrands());
            return
        }

        dispatch(fetchBrands());

    }, [dispatch, error, enqueueSnackbar, isCreated, isUpdated, isDeleted]);

    const handleBrandAdd = (e) => {
        e.preventDefault();
        if (newBrand.trim() !== '') {
            dispatch(createBrand(newBrand.trim()));
            setNewBrand('');
        }
    };

    const handleEdit = (Id) => {
        setEditingBrandId(Id); 
        const Value = brands.find(cat => cat._id === Id)?.title;
        setUpdateValue(Value)
    };

    const handleUpdate = (Id) => {
        console.log(updateValue)
            dispatch(updateBrand({ id: Id, title: updateValue }));
            setEditingBrandId(null); // Exit edit mode after update
    };

    const handleDelete =(id) =>{
        if (window.confirm('Are you sure you want to delete this brand?')) {
            dispatch(deleteBrand(id));
        }
    }

    const setBrands = () => {
        const data = {
            columns: [
                { label: 'ID', field: 'id', sort: 'asc' },
                { label: 'Brands', field: 'name', sort: 'asc' },
                { label: 'Actions', field: 'actions', sort: 'asc' },
            ],
            rows: [],
        };

        brands.forEach((cat) => {
            data.rows.push({
                id: cat._id,
                name: editingBrandId === cat._id ? (
                    <input
                        type="text"
                        value={updateValue} // Bind to updatedTitle when editing
                        onChange={(e) => setUpdateValue(e.target.value)}
                        className="form-control"
                    />
                ) : (
                    cat.title
                ),
                actions: (
                    editingBrandId === cat._id ? (
                        <button
                            onClick={() => handleUpdate(cat._id)}
                            className="btn btn-primary"
                        >
                            Update
                        </button>
                    ) : (
                       <> 
                       <button  onClick={() => handleEdit(cat._id)} className="btn btn-primary"> <FaEdit />  </button>
                        <button onClick={() => handleDelete(cat._id)} className='btn btn-danger py-1 px-2 ml-2'><FaTrashAlt /></button>
                        </> 
                    )
                ),
            });
        });

        return data;
    };

  return (
    <div>
    {status === 'loading' ? (
        <div className="d-flex align-items-start justify-content-center">
            <div className="loader"></div>
        </div>
    ) : status === 'succeeded' && brands.length === 0 ? (
       <>  
       <h1>No Brands Placed</h1>
       <Row className='w-100 mb-3'>
                <Col xs={10} sm={10} md={10} lg={10}>
                    <input className='form-control' type="text" value={newBrand} onChange={(e) => setNewBrand(e.target.value)} />
                </Col>
                <Col xs={2} sm={2} md={2} lg={2}>
                    <Button type="button" variant="primary" onClick={handleBrandAdd}>
                        {window.innerWidth < 800 ? '' : 'ADD '}
                        <IoIosAddCircle fontSize='1.5rem' />
                    </Button>
                </Col>
            </Row></> 
    ) : (
        <>
            <Row className="mt-4">
                <Col>
                    <h2>All Brands</h2>
                </Col>
            </Row>
            <Row className='w-100 mb-3'>
                <Col xs={10} sm={10} md={10} lg={10}>
                    <input className='form-control' type="text" value={newBrand} onChange={(e) => setNewBrand(e.target.value)} />
                </Col>
                <Col xs={2} sm={2} md={2} lg={2}>
                    <Button type="button" variant="primary" onClick={handleBrandAdd}>
                        {window.innerWidth < 800 ? '' : 'ADD '}
                        <IoIosAddCircle fontSize='1.5rem' />
                    </Button>
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
                            data={setBrands()}
                        />
                    </div>
                </Col>
            </Row>
        </>
    )}
</div>
  )
}

export default Brands