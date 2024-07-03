import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../API";

//get all users
export const fetchUsers = createAsyncThunk('category/fetchUsers', async () => {
    try {
        const response = await API.get('/admin/users');
        return response.data;
    } catch (error) {
        return Promise.reject(error.response?.data?.message || 'Failed to fetch categories');
    }
});

//get all User
export const fetchSingleUser = createAsyncThunk('category/fetchSingleUser', async (id) => {
    try {
        const response = await API.get(`/admin/user/${id}`);
        return response.data;
    } catch (error) {
        return Promise.reject(error.response?.data?.message || 'Failed to fetch categories');
    }
});


const AdminUserSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
        error: null,
        user:{},
        
    },
    reducers: {
        ClearUserError(state, action) {
            return {
              ...state,
              error: null,
            }
          },
          clearSingleUser(state, action) {
            return {
              ...state,
              user: null,
            }
          }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload.user;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch categories';
                state.users = [];
            })

            //Get Single User
            .addCase(fetchSingleUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSingleUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
            })
            .addCase(fetchSingleUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch categories';
            });
    }
});

// Exporting the selector
export const allUsers = (state) => state.users.users;
export const userStatus = (state) => state.users.status;
export const userError = (state) => state.users.error;
export const singleUser = (state) => state.users.user;

// Exporting the reducer function
export default AdminUserSlice.reducer;

export const {ClearUserError, clearSingleUser} = AdminUserSlice.actions