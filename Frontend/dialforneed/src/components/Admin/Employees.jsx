import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { MDBDataTable } from 'mdbreact';
import { IoIosAddCircle } from "react-icons/io";
import { useSnackbar } from 'notistack';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ClearEmployeeError, ClearIsCreated, ClearIsDeleted, ClearIsUpdated, Employee, EmployeesData, Error, IsCreated, IsDeleted, IsUpdated, Status, createEmployee, deleteEmployee, fetchEmployeeByID, fetchEmployees, updateEmployee } from '../../slices/EmployeeSlice';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export const Employees = () => {
    const [modalShow, setModalShow] = useState(false);
    const [isUpdateButton, setIsUpdateButton] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [employeeType, setEmployeeType] = useState('');

    const employees = useSelector(EmployeesData);
    const singleEmployee = useSelector(Employee);
    const status = useSelector(Status);
    const error = useSelector(Error);
    const isCreated = useSelector(IsCreated);
    const isDeleted = useSelector(IsDeleted);
    const isUpdated = useSelector(IsUpdated);

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' ,  
            anchorOrigin: {
               vertical: 'top',
               horizontal: 'center',
             }});
            dispatch(ClearEmployeeError());
            return
        }

        if (isCreated) {
            enqueueSnackbar("New Employee Created!", { variant: 'success',  
            anchorOrigin: {
               vertical: 'top',
               horizontal: 'center',
             } });
            dispatch(ClearIsCreated());
            dispatch(fetchEmployees());
            return
        }

        if (isUpdated) {
            enqueueSnackbar("Employee Updated", { variant: 'success',  
            anchorOrigin: {
               vertical: 'top',
               horizontal: 'center',
             } });
            dispatch(ClearIsUpdated());
            dispatch(fetchEmployees());
            return
        }

        if (isDeleted) {
            enqueueSnackbar("Employee Deleted", { variant: 'success',  
            anchorOrigin: {
               vertical: 'top',
               horizontal: 'center',
             } });
            dispatch(ClearIsDeleted());
            dispatch(fetchEmployees());
            return
        }

        dispatch(fetchEmployees());

    }, [dispatch, error, enqueueSnackbar, isUpdated, isCreated, isDeleted]);

    useEffect(() => {
        if (singleEmployee) {
            setId(singleEmployee._id ?? '');
            setName(singleEmployee.name ?? '');
            setEmail(singleEmployee.email ?? '');
            setPhoneNumber(singleEmployee.phoneNumber ?? '');
            setEmployeeType(singleEmployee.employeeType ?? '');
        }
    }, [singleEmployee]);

    const handleUpdate = (id) => {
        setIsUpdateButton(true);
        setModalShow(true);
        dispatch(fetchEmployeeByID(id));
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this Employee?')) {
            dispatch(deleteEmployee(id));
        }
    };

    const setEmployees = () => {
        const data = {
            columns: [
                { label: 'Name', field: 'name', sort: 'asc' },
                { label: 'Number', field: 'number', sort: 'asc' },
                { label: 'Type', field: 'type', sort: 'asc' },
                { label: 'Actions', field: 'actions', sort: 'asc' },
            ],
            rows: [],
        };

        if (employees && employees.length > 0) {
            employees.forEach((emp) => {
                data.rows.push({
                    name: (
                        <>
                            {emp.name}
                            <br />
                            <span className='text-secondary' style={{ fontSize: '14px' }}>({emp.email})</span>
                        </>
                    ),
                    number: emp.phoneNumber,
                    type: emp.employeeType,
                    actions: (
                        <>
                            <button onClick={() => handleUpdate(emp._id)} className='btn btn-primary'>
                                <FaEdit />
                            </button> &nbsp; &nbsp;
                            <button onClick={() => handleDelete(emp._id)} className='btn btn-danger'>
                                <FaTrashAlt />
                            </button>
                        </>
                    ),
                });
            });
        } else {
            console.log('No employees found.');
        }

        return data;
    };

    const handleCreateEmployee = (e) => {
        e.preventDefault();
        dispatch(createEmployee({ name, email, password, phoneNumber, employeeType }));
        setName('');
        setEmail('');
        setPassword('');
        setPhoneNumber('');
        setEmployeeType('');
    };

    const handleUpdateForm = (e) => {
        e.preventDefault();
        const obj = { name, email, phoneNumber, employeeType };
        dispatch(updateEmployee({ id, obj }))
            .then(() => {
                setId('');
                setName('');
                setEmail('');
                setPhoneNumber('');
                setEmployeeType('');
                setIsUpdateButton(false);
                setModalShow(false);
            })
            .catch((error) => {
                console.error('Failed to update employee:', error);
            });
    };

    const handleClose = () => {
        setModalShow(false);
        setIsUpdateButton(false);
    };

    const handleAddModelShow = () => {
        setName('');
        setEmail('');
        setPhoneNumber('');
        setEmployeeType('');
        setModalShow(true);
    };

    return (
        <div>
            <div>
                <h2>Employees</h2>
                <div className="mt-4 mx-2 d-flex justify-content-between">
                    <div>
                        <button variant="primary" onClick={handleAddModelShow} className='btn btn-primary'>Add <IoIosAddCircle fontSize='1.5rem' /></button>
                    </div>
                </div>
            </div>
            {status === 'loading' ? (
                <div className="d-flex align-items-start justify-content-center">
                    <div className="loader"></div>
                </div>
            ) : status === 'succeeded' && employees.length === 0 ? (
                <h6 className='mt-3'>No Employees Placed</h6>
            ) : (
                <>
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
                                    data={setEmployees()}
                                />
                            </div>
                        </Col>
                    </Row>
                </>
            )}
            <Modal
                show={modalShow}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {isUpdateButton ? <p>Update Employee </p> : <p>Create New Employee </p>}
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={isUpdateButton ? handleUpdateForm : handleCreateEmployee}>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control required onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Enter employee name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Email Id</Form.Label>
                            <Form.Control required onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Enter employee Email Id" />
                        </Form.Group>
                        {!isUpdateButton && (
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                                <Form.Label>Password</Form.Label>
                                <Form.Control required onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Enter employee password" />
                            </Form.Group>
                        )}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control required onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} type="text" placeholder="Enter employee Phone number" />
                        </Form.Group>
                        <Form.Label>Select Employee Type</Form.Label>
                        <Form.Select required onChange={(e) => setEmployeeType(e.target.value)} value={employeeType} aria-label="Default select example">
                            <option>Select</option>
                            <option value="sales">Sales</option>
                            <option value="service">Service</option>
                        </Form.Select>
                    </Modal.Body>
                    <Modal.Footer>
                        {isUpdateButton ?
                            <Button type="submit" className="btn btn-primary">Update</Button>
                            :
                            <Button type="submit" className="btn btn-primary">Submit</Button>}
                        <Button type="button" className="btn btn-danger" onClick={handleClose}>Close</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default Employees
