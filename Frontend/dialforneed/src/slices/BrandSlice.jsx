import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../API";

//get all brands
export const fetchBrands = createAsyncThunk('brand/fetchBrands', async () => {
    try {
        const response = await API.get('/brands');
        return response.data;
    } catch (error) {
        return Promise.reject(error.response?.data?.message || 'Failed to fetch brands');
    }
});

//Create brand
export const createBrand = createAsyncThunk('brand/createBrand', async (title) => {
    try {
        const response = await API.post('/admin/brand', {title});
        console.log(response.data)
        return response.data;
    } catch (error) {
        return Promise.reject(error.response?.data?.message || 'Failed to Create brand');
    }
});

// update brand thunk action creator
export const updateBrand = createAsyncThunk('brand/updateBrand', async ({ id, title }) => {
    try {
        const response = await API.put(`/admin/brand/${id}`, { title });
        return response.data; // Assuming response.data contains updated category information
    } catch (error) {
        return Promise.reject(error.response?.data?.message || 'Failed to update brand');
    }
});

// delete brands thunk action creator
export const deleteBrand = createAsyncThunk('brand/deleteBrand', async (id) => {
    try {
        const response = await API.delete(`/admin/brand/${id}`);
        return response.data; // Assuming response.data contains success message or updated category information
    } catch (error) {
        return Promise.reject(error.response?.data?.message || 'Failed to delete brand');
    }
});

const BrandSlice = createSlice({
    name: 'brand',
    initialState: {
        brands: [],
        status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
        error: null,
        isCreated:false,
        isUpdated:false,
        isDeleted:false
    },
    reducers: {
        ClearBrandError(state, action) {
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
            .addCase(fetchBrands.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchBrands.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.brands = action.payload.brand;
                state.error = null;
            })
            .addCase(fetchBrands.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch brands';
                state.brands = [];
            })

             //add Brands
             .addCase(createBrand.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createBrand.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isCreated = true;
                state.error = null;
            })
            .addCase(createBrand.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to createBrands';
            })

             //update Brand
             .addCase(updateBrand.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateBrand.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isUpdated = true;
                state.error = null;
            })
            .addCase(updateBrand.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to update brands';
            })

             //Delete Brand
             .addCase(deleteBrand.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteBrand.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isDeleted = true;
                state.error = null;
            })
            .addCase(deleteBrand.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to Delete brands';
            });
    }
});

// Exporting the selector
export const BrandData = (state) => state.brand.brands;
export const BrandStatus = (state) => state.brand.status;
export const BrandError = (state) => state.brand.error;


//create
export const IsCreated = (state) => state.brand.isCreated;

//update
export const IsUpdated = (state) => state.brand.isUpdated;

//delete
export const IsDeleted = (state) => state.brand.isDeleted;

// Exporting the reducer function
export default BrandSlice.reducer;
export const {ClearBrandError,ClearIsCreated, ClearIsUpdated, ClearIsDeleted} = BrandSlice.actions
