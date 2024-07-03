import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../API";

// Login user
export const loginUser = createAsyncThunk('auth/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await API.post('/login', {
                email, password
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Authentication Failed');
        }
    }
);

//Register user
export const registerUser = createAsyncThunk('auth/registerUser',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await API.post('/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error registering user:', error.response?.data?.message || error.message || 'Unknown error');
            return rejectWithValue(error.response?.data?.message || 'Authentication Failed');
        }
    }
);

//Load user
export const loadUser = createAsyncThunk('auth/loadUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await API.get('/myprofile');
            return response.data; // Assuming response.data is an object with user details
        } catch (error) {
            console.error('Error loading user:', error.response?.data?.message || 'Unknown error');
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

//logout user
export const logoutUser = createAsyncThunk('auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await API.get('/logout');
            // Clear all cookies related to your application
            const cookies = document.cookie.split('; ');
            for (let cookie of cookies) {
                const [name] = cookie.split('=');
                document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            }

            return response.data; // Assuming response.data is an object with user details
        } catch (error) {
            console.error('Error loading user:', error.response?.data?.message || 'Unknown error');
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

//Edit profile by user
export const editUser = createAsyncThunk('auth/editUser',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await API.put('/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data; // Assuming response.data is an object with user details
        } catch (error) {
            console.error('Error loading user:', error.response?.data?.message || 'Unknown error');
            return rejectWithValue(error.response?.data?.message);
        }
    }
);


//forgot password request 
export const forgotPassword = createAsyncThunk('auth/forgotPassword',
    async (email, { rejectWithValue }) => {
        try {
            console.log({ email })
            const response = await API.post('/password/forgot', { email });
            return response.data;
        } catch (error) {
            console.error('Error loading user:', error.response?.data?.message || 'Unknown error');
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

//reset password
export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async ({ password, confirmPassword, token }, { rejectWithValue }) => {
        try {

            const response = await API.post(`/password/reset/${token}`, { password, confirmPassword });

            return response.data;
        } catch (error) {
            console.error('Error resetting password:', error.response?.data?.message || 'Unknown error');
            return rejectWithValue(error.response?.data?.message || 'Failed to reset password');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        status: 'idle',
        error: null,
        user: null,
        passwordReset:false
    },
    reducers: {
        clearError(state, action) {
            return {
                ...state,
                error: null
            }
        },
        clearUpdated(state, action) {
            return {
                ...state,
                isUpdated: false
            }
        },
        clearPasswordReseted(state, action) {
            return {
                ...state,
                passwordReset: false
            }
        }
    },
    extraReducers: (builder) => {
        builder
            //login
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.isAuthenticated = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAuthenticated = true;
                state.error = null;
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Authentication failed';
                state.isAuthenticated = false;
            })

            //register
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.isAuthenticated = false;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAuthenticated = true;
                state.error = null;
                state.user = action.payload.user;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Registration failed';
                state.isAuthenticated = false;
            })

            //load users
            .addCase(loadUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.isAuthenticated = false;
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAuthenticated = true;
                state.error = null;
                state.user = action.payload.user;
            })
            .addCase(loadUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = null;
                state.isAuthenticated = false;
            })


            //logout users
            .addCase(logoutUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.isAuthenticated = false;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAuthenticated = false;
                state.error = null;
                state.user = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                state.isAuthenticated = false;
            })

            //update profile 
            .addCase(editUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.isAuthenticated = true;
                state.isUpdated = false
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAuthenticated = true;
                state.error = null;
                state.user = action.payload.user;
                state.isUpdated = true
            })
            .addCase(editUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                state.isAuthenticated = false;
            })


            //forgot password request  
            .addCase(forgotPassword.pending, (state) => {
                state.status = 'loading';
                state.message = null;

            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.message = action.payload.message;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            //reset password request  
            .addCase(resetPassword.pending, (state) => {
                state.status = 'loading';

            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.passwordReset = true
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.message;
            });


    }
});

// Exporting the selector
export const loginIsAuthenticated = (state) => state.auth.isAuthenticated;
export const loginAuthStatus = (state) => state.auth.status;
export const loginAuthError = (state) => state.auth.error;
export const loginAuthUser = (state) => state.auth.user;

export const isUpdated = (state) => state.auth.isUpdated;

// Exporting the reducer function
export default authSlice.reducer;

// forgot password 
export const Message = (state) => state.auth.message;

//Password Resetted
export const passwordResetted = (state) => state.auth.passwordReset;

//Exporting reducer
export const { clearPasswordReseted, clearError, clearUpdated } = authSlice.actions
