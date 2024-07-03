import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../API";

//get all categories
export const fetchCategory = createAsyncThunk('category/fetchCategory', async () => {
    try {
        const response = await API.get('/categories');
        return response.data;
    } catch (error) {
        return Promise.reject(error.response?.data?.message || 'Failed to fetch categories');
    }
});

//Create category
export const createCategory = createAsyncThunk('category/createCategory', async (formData) => {
    try {
        const response = await API.post('/admin/category', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        return Promise.reject(error.response?.data?.message || 'Failed to Create category');
    }
});

// updateCategory thunk action creator
export const updateCategory = createAsyncThunk('category/updateCategory', async ({ id, formData }) => {
    try {
        const response = await API.put(`/admin/category/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data; // Assuming response.data contains updated category information
    } catch (error) {
        return Promise.reject(error.response?.data?.message || 'Failed to update category');
    }
});

// deleteCategory thunk action creator
export const deleteCategory = createAsyncThunk('category/deleteCategory', async (id) => {
    try {
        const response = await API.delete(`/admin/category/${id}`);
        return response.data; // Assuming response.data contains success message or updated category information
    } catch (error) {
        return Promise.reject(error.response?.data?.message || 'Failed to delete category');
    }
});



const CategorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
        error: null,
        isCreated:false,
        isUpdated:false,
        isDeleted:false

    },
    reducers: {
        ClearCategoryError(state, action) {
            return {
              ...state,
              error: null,
            }
          },
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
            .addCase(fetchCategory.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCategory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload.category;
                state.error = null;
            })
            .addCase(fetchCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch categories';
                state.categories = [];
            })

            //add Categories
            .addCase(createCategory.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isCreated = true;
                state.error = null;
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to create categories';
            })

             //update Categories
             .addCase(updateCategory.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isUpdated = true;
                state.error = null;
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to update categories';
            })

             //Delete Categories
             .addCase(deleteCategory.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isDeleted = true;
                state.error = null;
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to Delete categories';
            });
    }
});

// Exporting the selector
export const CategoriesData = (state) => state.category.categories;
export const categoryStatus = (state) => state.category.status;
export const categoryError = (state) => state.category.error;

//create
export const IsCreated = (state) => state.category.isCreated;

//update
export const IsUpdated = (state) => state.category.isUpdated;

//delete
export const IsDeleted = (state) => state.category.isDeleted;

// Exporting the reducer function
export default CategorySlice.reducer;

export const {ClearCategoryError,ClearIsCreated, ClearIsUpdated, ClearIsDeleted} = CategorySlice.actions