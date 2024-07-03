import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../API";

//get all Task
export const fetchTasks = createAsyncThunk('task/fetchTasks', async () => {
    try {
        const response = await API.get('/admin/gettasks');
        return response.data;
    } catch (error) {
        return Promise.reject(error.response?.data?.message || 'Failed to fetch Tasks');
    }
});

//get Task by Id
export const fetchTaskByID = createAsyncThunk('task/fetchTaskByID', async (id) => {
    try {
        const response = await API.get(`/admin/task/${id}`);
        return response.data;
    } catch (error) {
        return Promise.reject(error.response?.data?.message || 'Failed to fetch Taks');
    }
});

//get employee by orderItemId
export const fetchEmployeesTasks = createAsyncThunk('task/fetchEmployeesTasks', async () => {
    try {
        const response = await API.get(`/admin/getEmployees`);
        return response.data;
    } catch (error) {
        return Promise.reject(error.response?.data?.message || 'Failed to fetch tasks');
    }
});

//Create Task
export const createTask = createAsyncThunk('task/createTask',async ({ id, taskData }) => {
        try {
            const response = await API.post(`/admin/assigntask/${id}`, taskData);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to Create Task';
        }
    }
);

// delete Task thunk action creator
export const deleteTask = createAsyncThunk('task/deleteTask', async (id) => {
    try {
        const response = await API.delete(`/admin/task/${id}`);
        return response.data; // Assuming response.data contains success message or updated category information
    } catch (error) {
        return Promise.reject(error.response?.data?.message || 'Failed to delete Employee');
    }
});


//SingleEmployeeTasks
export const SingleEmployeeTasks = createAsyncThunk('task/SingleEmployeeTasks', async () => {
    try {
        const response = await API.get(`/employee/gettasks`);
        return response.data; // Assuming response.data contains success message or updated category information
    } catch (error) {
        return Promise.reject(error.response?.data?.message || 'Failed to get employee');
    }
});

//update isRequested by employee
export const employeeRequested = createAsyncThunk('task/employeeRequested', async (id) => {
    try {
        const response = await API.put(`/employee/requested/${id}`);
        return response.data; // Assuming response.data contains success message or updated category information
    } catch (error) {
        return Promise.reject(error.response?.data?.message || 'Failed to Requested');
    }
});


//get all requests by user
export const getRequestsByUser = createAsyncThunk('task/getRequestsByUser', async () => {
    try {
        const response = await API.get(`/user/getRequests`);
        return response.data; // Assuming response.data contains success message or updated category information
    } catch (error) {
        return Promise.reject(error.response?.data?.message || 'Failed to get requests');
    }
});

//update requests status by user
export const requestReply = createAsyncThunk('task/requestReply', async ({ id, status }) => {
    try {
        const response = await API.put(`/user/updateRequests/${id}`, { status: status });
        return response.data; // Assuming response.data contains success message or updated category information
    } catch (error) {
        return Promise.reject(error.response?.data?.message || 'Failed to update request status');
    }
});

const TaskSlice = createSlice({
    name: 'task',
    initialState: {
        tasks: [],
        status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
        error: null,
        isCreated:false,
        isUpdated:false,
        isDeleted:false,
        task:null,
        employees:null,
        isRequested:false,

        //user get all requests
        requests:[],
        requestReply:false
    },
    reducers: {
        ClearTaskError(state, action) {
            return {
              ...state,
              error: null,
            }
          }
        ,
          ClearIsCreated(state, action) {
            return {
              ...state,
              isCreated:false
            }
          },
          ClearIsDeleted(state, action) {
            return {
              ...state,
              isDeleted:false
            }
          },
          ClearEmployee(state, action) {
            return {
              ...state,
              employees:null
            }
          },
          ClearIsRequested(state, action){
            return {
                ...state,
                isRequested:false
              }
          },
          ClearRequestReply(state, action){
            return {
                ...state,
                requestReply:false
              }
          }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks = action.payload.tasks;
                state.error = null;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch Tasks';
            })

             //add Tasks
             .addCase(createTask.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isCreated = true;
                state.error = null;
            })
            .addCase(createTask.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to create Task';
            })


             //Delete Tasks
             .addCase(deleteTask.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isDeleted = true;
                state.error = null;
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to Delete Tasks';
            })

            //fetch task by Id
            .addCase(fetchTaskByID.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchTaskByID.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.task = action.payload.task
                state.error = null;
            })
            .addCase(fetchTaskByID.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to get Tasks';
            })

            
            //fetch Employe by orderItemId
            .addCase(fetchEmployeesTasks.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchEmployeesTasks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.employees = action.payload.task
                state.error = null;
            })
            .addCase(fetchEmployeesTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to get Employee';
            })

            //fetch single Employee Tasks
            .addCase(SingleEmployeeTasks.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(SingleEmployeeTasks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks = action.payload.task
                state.error = null;
            })
            .addCase(SingleEmployeeTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to get Employee';
            })

              //Update isRequested by employee
              .addCase(employeeRequested.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(employeeRequested.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isRequested = true
                state.error = null;
            })
            .addCase(employeeRequested.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to Requested';
            })

             //get all requests by user
             .addCase(getRequestsByUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getRequestsByUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.requests = action.payload.requests
                state.error = null;
            })
            .addCase(getRequestsByUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to Requested';
            })

            
             //Request Reply by user
             .addCase(requestReply.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(requestReply.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.requestReply = true
                state.error = null;
            })
            .addCase(requestReply.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to Requested';
            })
    }
});

// Exporting the selector
export const TasksData = (state) => state.task.tasks;
export const Status = (state) => state.task.status;
export const Error = (state) => state.task.error;
export const Task = (state) => state.task.task;
//get employee
export const Employees = (state) => state.task.employees;


//create
export const IsCreated = (state) => state.task.isCreated;

//update
export const IsUpdated = (state) => state.task.isUpdated;

//delete
export const IsDeleted = (state) => state.task.isDeleted;


//employee isReq
export const IsRequested = (state) => state.task.isRequested;


// get requests
export const userRequests = (state) => state.task.requests;
export const requestsReplyState = (state) => state.task.requestReply;

// Exporting the reducer function
export default TaskSlice.reducer;
export const {ClearRequestReply, ClearIsRequested, ClearEmployee, ClearTaskError,ClearIsCreated, ClearIsUpdated, ClearIsDeleted} = TaskSlice.actions
