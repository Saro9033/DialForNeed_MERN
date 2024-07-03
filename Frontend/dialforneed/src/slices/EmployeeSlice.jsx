import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../API";

//get all brands
export const fetchEmployees = createAsyncThunk('employee/fetchEmployees', async () => {
    try {
        const response = await API.get('/admin/employees');
        return response.data;
    } catch (error) {
        return Promise.reject(error.response?.data?.message || 'Failed to fetch Employees');
    }
});

//get  employee by Id
export const fetchEmployeeByID = createAsyncThunk('employee/fetchEmployeeByID', async (id) => {
    try {
        const response = await API.get(`/admin/employee/${id}`);
        return response.data;
    } catch (error) {
        return Promise.reject(error.response?.data?.message || 'Failed to fetch Employees');
    }
});


//Create Employee
export const createEmployee = createAsyncThunk('employee/createEmployee', async (obj) => {
    try {
        const response = await API.post('/admin/employee/create', obj);
        console.log(response.data)
        return response.data;
    } catch (error) {
        return Promise.reject(error.response?.data?.message || 'Failed to Create Employee');
    }
});

// Employee brand thunk action creator
export const updateEmployee = createAsyncThunk( 'employee/updateEmployee', async ({ id, obj }) => {
      try {
        const response = await API.put(`admin/employee/${id}`, obj);
        return response.data; // Assuming response.data contains updated employee information
      } catch (error) {
        return Promise.reject(error.response?.data?.message || 'Failed to update Employee');
      }
    }
  );

// delete brands thunk action creator
export const deleteEmployee = createAsyncThunk('employee/deleteEmployee', async (id) => {
    try {
        const response = await API.delete(`admin/employee/${id}`);
        return response.data; // Assuming response.data contains success message or updated category information
    } catch (error) {
        return Promise.reject(error.response?.data?.message || 'Failed to delete Employee');
    }
});

const EmployeeSlice = createSlice({
    name: 'employee',
    initialState: {
        employees: [],
        status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
        error: null,
        isCreated:false,
        isUpdated:false,
        isDeleted:false,
        employee:null
    },
    reducers: {
        ClearEmployeeError(state, action) {
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
          ClearIsUpdated(state, action) {
            return {
              ...state,
              isUpdated:false
            }
          },
          ClearIsDeleted(state, action) {
            return {
              ...state,
              isDeleted:false
            }
          }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.employees = action.payload.employees;
                state.error = null;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch Employees';
            })

            

             //add Employee
             .addCase(createEmployee.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createEmployee.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isCreated = true;
                state.error = null;
            })
            .addCase(createEmployee.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to create Employees';
            })

             //update Employee
             .addCase(updateEmployee.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isUpdated = true;
                state.error = null;
            })
            .addCase(updateEmployee.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to update Employee';
            })

             //Delete Employee
             .addCase(deleteEmployee.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isDeleted = true;
                state.error = null;
            })
            .addCase(deleteEmployee.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to Delete Employee';
            })

            //fetch Employe by Id
            .addCase(fetchEmployeeByID.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchEmployeeByID.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.employee = action.payload.employee
                state.error = null;
            })
            .addCase(fetchEmployeeByID.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to get Employee';
            });
    }
});

// Exporting the selector
export const EmployeesData = (state) => state.employee.employees;
export const Status = (state) => state.employee.status;
export const Error = (state) => state.employee.error;
export const Employee = (state) => state.employee.employee;


//create
export const IsCreated = (state) => state.employee.isCreated;

//update
export const IsUpdated = (state) => state.employee.isUpdated;

//delete
export const IsDeleted = (state) => state.employee.isDeleted;

// Exporting the reducer function
export default EmployeeSlice.reducer;
export const {ClearEmployeeError,ClearIsCreated, ClearIsUpdated, ClearIsDeleted} = EmployeeSlice.actions
