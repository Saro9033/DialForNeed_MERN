import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../API";

//get all Carousels
export const fetchCarousels = createAsyncThunk('carousel/fetchCarousels', async () => {
    try {
        const response = await API.get('/carousels');
        return response.data;
    } catch (error) {
        return Promise.reject(error.response?.data?.message || 'Failed to fetch Carousels');
    }
});

//Create Carousel
export const createCarousel = createAsyncThunk('carousel/createCarousel', async (formData) => {
    try {
        const response = await API.post('/carousel/new',formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        return Promise.reject(error.response?.data?.message || 'Failed to Create Carousel');
    }
});


// delete carousel thunk action creator
export const deleteCarousel = createAsyncThunk('carousel/deleteCarousel', async (id) => {
    try {
        const response = await API.delete(`/carousel/${id}`);
        return response.data; // Assuming response.data contains success message or updated category information
    } catch (error) {
        return Promise.reject(error.response?.data?.message || 'Failed to delete carousel');
    }
});

const CarouselSlice = createSlice({
    name: 'carousel',
    initialState: {
        carousels: [],
        status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
        error: null,
        isCreated:false,
        isDeleted:false
    },
    reducers: {
        ClearCarouselError(state, action) {
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
          }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCarousels.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCarousels.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.carousels = action.payload.carousels;
                state.error = null;
            })
            .addCase(fetchCarousels.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch Carousels';
            })

             //add carousel
             .addCase(createCarousel.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createCarousel.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isCreated = true;
                state.error = null;
            })
            .addCase(createCarousel.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to create Carousel';
            })

             //Delete carousle
             .addCase(deleteCarousel.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteCarousel.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isDeleted = true;
                state.error = null;
            })
            .addCase(deleteCarousel.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to Delete Carousel';
            });
    }
});

// Exporting the selector
export const CarouselData = (state) => state.carousel.carousels;
export const CarouselStatus = (state) => state.carousel.status;
export const CarouselError = (state) => state.carousel.error;


//create
export const IsCreated = (state) => state.carousel.isCreated;

//update
export const IsUpdated = (state) => state.carousel.isUpdated;

//delete
export const IsDeleted = (state) => state.carousel.isDeleted;

// Exporting the reducer function
export default CarouselSlice.reducer;
export const {ClearCarouselError,ClearIsCreated,  ClearIsDeleted} = CarouselSlice.actions
