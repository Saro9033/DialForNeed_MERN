import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClearIsRequested, ClearTaskError, Error, IsRequested, SingleEmployeeTasks, Status, TasksData, employeeRequested, fetchEmployeesTasks } from '../../slices/TaskSlice';
import { useSnackbar } from 'notistack';
import avatar from '../../assets/avatar.png'
import { Link } from 'react-router-dom';
import MetaData from '../../components/Layouts/MetaData'
const EmpTasks = () => {
    const tasks = useSelector(TasksData) || []; // Ensure tasks is initialized to an empty array
    const status = useSelector(Status);
    const error = useSelector(Error);

    //employee reqeusted
    const isRequested = useSelector(IsRequested)

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Clear error message if there was any
                if (error) {
                    enqueueSnackbar(error, { variant: 'error',  
                    anchorOrigin: {
                       vertical: 'top',
                       horizontal: 'center',
                     } });
                    dispatch(ClearTaskError());
                    return
                }

                if(isRequested){
                    enqueueSnackbar("Requested", { variant: 'success',  
                    anchorOrigin: {
                       vertical: 'top',
                       horizontal: 'center',
                     } });
                    dispatch(ClearIsRequested())
                    return
                }

                // Fetch tasks (assuming fetchEmployeesTasks is the correct action)
                dispatch(SingleEmployeeTasks());
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchData();
    }, [dispatch, error,isRequested, enqueueSnackbar]);

    console.log(tasks);


    const handleRequested = async (e,id) =>{
        e.preventDefault()
       dispatch(employeeRequested(id))
    }

    return (
        <div>
            <MetaData title="Employee Tasks" />
            {status === 'loading' ? (
                <div className="d-flex align-items-start justify-content-center">
                    <div className="loader"></div>
                </div>
            ) : tasks.length == 0 ? 
                <p>No Tasks</p>
             :( tasks.length > 0) && (
                <ul style={{ listStyleType: 'none' }} className='m-0 p-0'>

                    {tasks.map((task) => ( // Ensure tasks is an array before mapping
                        <Link style={{textDecoration:'none', color:'unset'}} to={`/taskDetails/${task._id}`}  key={task._id} className='p-2 my-2 rounded-2 shadow-sm border d-flex align-items-center justify-content-between'>
                            <div className='d-flex align-items-center '>
                                <img src={task?.order?.user?.avatar ? task.order.user.avatar : avatar} width="50" height="50" style={{ borderRadius: '50%' }} className="border" alt="" />
                                <div className='d-flex flex-column pl-2'>
                                    <h5 className='m-0'>{task?.order?.user?.name}</h5>
                                    {/* <p style={{ fontSize: '14px' }} className='m-0 text-secondary'>{task.order.user.phoneNumber}</p> */}
                                    <p style={{ fontSize: '14px' }} className='m-0 text-secondary'>  Order on {new Date(task.order?.paidAt).toLocaleDateString()} </p>

                                </div></div>
                            <div >
                                <div>
                                    {task?.orderItem?.status.includes("pending") || task?.orderItem?.status?.includes("Pending") ? (
                                        <span className='text-danger' style={{ fontSize: '14px', fontWeight: '600' }}>{task?.orderItem?.status}</span>
                                    ) : (
                                        <span className='text-success' style={{ fontSize: '14px', fontWeight: '600' }}>{task?.orderItem?.status}</span>
                                    )}
                                </div>
                                <button type="button" onClick={(e)=>handleRequested(e,task?.orderItem._id)} className={`btn ${task?.orderItem?.isRequested ? 'btn-outline-primary' : 'btn-primary'}`} style={{fontSize:'12px', padding:"3px 6px"}}>{task.orderItem?.isRequested ? 'Requested' : 'Send Request'}</button>
                            </div>
                        </Link>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default EmpTasks;
