import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../API";

// Create a new order
export const createOrder = createAsyncThunk('order/createOrder', async (obj, { rejectWithValue }) => {
    try {
        const response = await API.post('/order/new', obj);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to create order';
        return rejectWithValue(errorMessage);
    }
});

// get user  orders
export const getUserOrder = createAsyncThunk('order/getUserOrder', async (_, { rejectWithValue }) => {
    try {
        const response = await API.get('/myorders');
        console.log(response.data)
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to get orders';
        return rejectWithValue(errorMessage);
    }
});

// get  order Details
export const getOrderDetail = createAsyncThunk('order/getOrderDetail', async (id, { rejectWithValue }) => {
    try {
        const response = await API.get(`/order/${id}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to get Order Details';
        return rejectWithValue(errorMessage);
    }
});

// get Admin orders 
export const getAdminOrders = createAsyncThunk('order/getAdminOrders', async (_, { rejectWithValue }) => {
    try {
        const response = await API.get(`/admin/orders`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to get Orders';
        return rejectWithValue(errorMessage);
    }
});

// get all  orders Items 
export const getAllOrderItems = createAsyncThunk('order/getAllOrderItems', async (_, { rejectWithValue }) => {
    try {
        const response = await API.get(`/admin/orderItems`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to get Orders';
        return rejectWithValue(errorMessage);
    }
});

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        userOrders: [],
        orderItems:[],
        status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
        error: null,
        orderDetail: {},
        adminOrders: [],
        isOrderUpdate: false
    },
    reducers: {
        clearOrderError(state, action) {
            return {
                ...state,
                error: null
            }
        },
        ClearOrder(state, action) {
            return {
                ...state,
                userOrders: []
            }
        },

        ClearIsOrderUpdated(state, action) {
            return {
                ...state,
                isOrderUpdate: false
            }
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orderDetail = action.payload.order;
                state.error = null;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            //user orders
            .addCase(getUserOrder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUserOrder.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userOrders = action.payload.order;
            })
            .addCase(getUserOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            //order Detail page
            .addCase(getOrderDetail.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getOrderDetail.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orderDetail = action.payload.order;
                state.error = null;
            })
            .addCase(getOrderDetail.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            //get Admin orders
            .addCase(getAdminOrders.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAdminOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.adminOrders = action.payload.orders;
            })
            .addCase(getAdminOrders.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            //get all  order Items by admin
            .addCase(getAllOrderItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllOrderItems.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orderItems = action.payload.orderItems;
            })
            .addCase(getAllOrderItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

    }
});

// Exporting the selector
export const userOrders = (state) => state.order.userOrders;
export const orderDetail = (state) => state.order.orderDetail;
export const orderStatus = (state) => state.order.status;
export const orderError = (state) => state.order.error;
export const AdminOrders = (state) => state.order.adminOrders;

export const OrderItems = (state) => state.order.orderItems;

// Exporting the reducer function
export default orderSlice.reducer;
export const { clearOrderError, ClearOrder, ClearIsOrderUpdated } = orderSlice.actions

