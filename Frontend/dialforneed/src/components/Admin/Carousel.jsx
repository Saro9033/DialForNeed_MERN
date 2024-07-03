import { MDBDataTable } from 'mdbreact';
import { IoIosAddCircle } from "react-icons/io";
import { useSnackbar } from 'notistack';
import { Row, Col, Button } from 'react-bootstrap';
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { CarouselData, CarouselError, CarouselStatus, ClearCarouselError, ClearIsCreated, ClearIsDeleted, IsCreated, IsDeleted, createCarousel, deleteCarousel, fetchCarousels } from '../../slices/CarouselSlice';
import Modal from 'react-bootstrap/Modal';
import addImage from '../../assets/add-image.png'
import { Form, InputGroup } from 'react-bootstrap';
import { FaRegEye } from "react-icons/fa";


const Carousel = () => {
    const carousels = useSelector(CarouselData);
    const status = useSelector(CarouselStatus);
    const error = useSelector(CarouselError);
    const isCreated = useSelector(IsCreated);
    const isDeleted = useSelector(IsDeleted);
    const [addModalShow, setAddModalShow] = React.useState(false);
    const [seeModalShow, setSeeModalShow] = React.useState(false);

    const [avatar, setAvatar] = useState('');
    const [singleData, setSingleData]=useState('');
    const [avatarPreview, setAvatarPreview] = useState(addImage);
    const [link, setLink] = useState('');

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error',  
            anchorOrigin: {
               vertical: 'top',
               horizontal: 'center',
             } });
            dispatch(ClearCarouselError());
            return
        }

        if (isCreated) {
            enqueueSnackbar("Category Added", { variant: 'success',  
            anchorOrigin: {
               vertical: 'top',
               horizontal: 'center',
             } });
            dispatch(ClearIsCreated());
            dispatch(fetchCarousels());
            return
        }

        if (isDeleted) {
            enqueueSnackbar("Category Deleted", { variant: 'success',  
            anchorOrigin: {
               vertical: 'top',
               horizontal: 'center',
             } });
            dispatch(ClearIsDeleted()); // Make sure to clear the isUpdated flag
            dispatch(fetchCarousels());
            return
        }

        dispatch(fetchCarousels());

    }, [dispatch, error, enqueueSnackbar, isCreated, isDeleted]);



    const setCarousels = () => {
        const data = {
            columns: [
                { label: 'Carousels', field: 'carousel', sort: 'asc' },
                { label: 'Actions', field: 'actions', sort: 'asc' },
            ],
            rows: [],
        };

        carousels.forEach((cat) => {
            data.rows.push({
                carousel: <img src={cat?.image} width="100"  />,
                actions:
                    <>
                         <button onClick={() => handleView(cat._id)} className='btn btn-primary py-1 px-2 ml-2'><FaRegEye/></button>
                        <button onClick={() => handleDelete(cat._id)} className='btn btn-danger py-1 px-2 ml-2'><FaTrashAlt /></button>
                    </>
            });
        });

        return data;
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

const handleDelete =(id)=>{
    dispatch(deleteCarousel(id))
    
}

const handleView = (id) => {
    setSeeModalShow(true);
    const single = carousels.find(carousel => carousel._id.toString() === id.toString());
    console.log(single);
    setSingleData(single);
};


    const handleCarouselAdd = async (e) => {
        e.preventDefault();
        let formData = new FormData()
        formData.append('image', avatar)
        formData.append('link', link)
       await dispatch(createCarousel(formData))
       setAddModalShow(false);
       setAvatar(null);
       setAvatarPreview(addImage);
       setLink('');

    };

    const handleCloseSeeModal = ()=>{
        setSingleData('')
        setSeeModalShow(false)
    }

    return (
        <div>
            {status === 'loading' ? (
                <div className="d-flex align-items-start justify-content-center">
                    <div className="loader"></div>
                </div>
            ) : status === 'succeeded' && carousels.length === 0 ? (
                <>   <h1>No Carousels Placed</h1>
                    <Button onClick={() => setAddModalShow(true)}>Add Carousel</Button>
                </>
            ) : (
                <>
                    <Row className="mt-4">
                        <Col>
                            <h2>All Carousels</h2>
                        </Col>
                        <Button onClick={() => setAddModalShow(true)}>Add Carousel</Button>
                    </Row>

                    <Row className="mt-4">
                        <Col>
                            <div className="table-responsive">
                                <MDBDataTable
                                    className="px-3"
                                    bordered
                                    striped
                                    hover
                                    searching={false}
                                    responsive
                                    data={setCarousels()}
                                />
                            </div>
                        </Col>
                    </Row>
                </>
            )}



            {/* Add model  */}
            <Modal
                show={addModalShow}
                onHide={() => setAddModalShow(false)}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Carousel
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleCarouselAdd}>
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
                        <Form.Group controlId="linkInput">
                            <Form.Label>Link to:</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder="https://example.com"
                                    value={link}
                                    onChange={(e)=>setLink(e.target.value)}
                                />
                            </InputGroup>
                        </Form.Group>

                        <Button type="submit" className='btn btn-primary mt-5 w-100 d-block'>Add</Button>
                    </form>
                </Modal.Body>

            </Modal>

 {/* view model  */}
 <Modal
                show={seeModalShow}
                onHide={handleCloseSeeModal}
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
                        <div className="file-upload-container d-flex align-items-center justify-content-center">
                    
                                    <img src={singleData?.image} width="100%" height="200px" className="personal-avatar" alt="avatar" />
                    </div>
                    <Form.Group controlId="linkInput">
                            <Form.Label>Link to:</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    value={singleData?.link}
                                />
                            </InputGroup>
                        </Form.Group>
                </Modal.Body>

            </Modal>
        </div>
    )
}

export default Carousel