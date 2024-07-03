import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../API";

//get all products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async ({ keyword, price, categoryId, brandId, type, ratings, isOnlyCategory }) => {
  try {
    let link = '/products';
    if (keyword !== null && keyword !== undefined) {
      link += `?keyword=${keyword}`
    }
    if (price !== null && price !== undefined) {
      link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`
    }
    if (categoryId !== null && categoryId !== undefined) {
   
      link += `${isOnlyCategory ? '?':'&'}categoryId=${categoryId}`
    }
    if (brandId !== null && brandId !== undefined) {
      link += `&brandId=${brandId}`
    }
    if (type !== null && type !== undefined) {
      link += `&type=${type}`
    }
    if (ratings !== null && ratings !== undefined) {
      link += `&ratings=${ratings}`
    }


    console.log(link)
    const response = await API.get(link);
    return response.data;
  } catch (error) {
    return Promise.reject(error.response?.data?.message || 'Failed to fetch products');
  }
});

//get product by id
export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id) => {
  try {
    const response = await API.get(`/product/${id}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    return Promise.reject(error.response?.data?.message || 'Failed to fetch products');
  }
});

//Create Review
export const createReview = createAsyncThunk('products/createReview', async (reviewData) => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }
    const response = await API.put(`/review`, reviewData, config);
    return response.data;
  } catch (error) {
    return Promise.reject(error.response?.data?.message || 'Failed to fetch products');
  }
});


//get all products by Admin:
export const adminProducts = createAsyncThunk('products/adminProducts', async () => {
  try {
    const response = await API.get(`/admin/products`);
    return response.data;
  } catch (error) {
    return Promise.reject(error.response?.data?.message || 'Failed to fetch products');
  }
});

//create new product by Admin:
export const createSingleProduct = createAsyncThunk('products/createSingleProduct', async (formData) => {
  try {
    const response = await API.post(`/admin/product/new`, formData);
    console.log(response.data)
    return response.data;
  } catch (error) {
    return Promise.reject(error.response?.data?.message || 'Failed to fetch products');
  }
});

//Delete product by Admin:
export const deleteSingleProduct = createAsyncThunk('products/deleteSingleProduct', async (id) => {
  try {
    const response = await API.delete(`/admin/product/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error.response?.data?.message || 'Failed to fetch products');
  }
});

// Update product by Admin:
export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, formData }) => {
  try {
    const response = await API.put(`/admin/product/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error.response?.data?.message || 'Failed to update product');
  }
});

// Get all reviews  by Admin:
export const getReviewsByAdmin = createAsyncThunk('products/getReviewsByAdmin', async (id) => {
  try {
    const response = await API.get(`/admin/reviews/`, {
      params: { id }
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error.response?.data?.message || 'Failed to update product');
  }
});

// delete Review by Admin:
export const deleteReview = createAsyncThunk('products/deleteReview', async (productId, id) => {
  try {
    const response = await API.delete(`/admin/review/`, {
      params: { productId, id }
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error.response?.data?.message || 'Failed to update product');
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    product: null,
    status: 'idle',
    error: null,
    singleProductStatus: 'idle',
    singleProductError: null,
    isReviewSubmitted: false,
    isProductCreated: false,
    isProductDeleted: false,
    isProductUpdated: false

    ,
    isReviewDeleted: false,
    reviews: []
  },
  reducers: {
    ClearError(state, action) {
      return {
        ...state,
        singleProductError: null,
        error: null
      }
    },
    ClearReviewSubmmited(state, action) {
      return {
        ...state,
        isReviewSubmitted: false
      }
    },
    ClearProduct(state, action) {
      return {
        ...state,
        product: null
      }
    },

    //Clear isProductCreated after showing alert
    ClearIsProductCreated(state, action) {
      return {
        ...state,
        isProductCreated: false
      }
    },

    //Clear isProductDeleted after showing alert
    ClearIsProductDeleted(state, action) {
      return {
        ...state,
        isProductDeleted: false
      }
    },

    //Clear isProductUpdated after showing alert
    ClearIsProductUpdated(state, action) {
      return {
        ...state,
        isProductUpdated: false
      }
    },

    //Clear isReviewDeleted after showing alert
    ClearIsReviewDeleted(state, action) {
      return {
        ...state,
        isReviewDeleted: false
      }
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.status = 'loading'
    })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.products;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.products = [];
      })


      .addCase(fetchProductById.pending, (state) => {
        state.singleProductStatus = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.singleProductStatus = 'succeeded';
        state.product = action.payload.product;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.singleProductStatus = 'failed';
        state.singleProductError = action.error.message;
        state.product = null;
      })


      //updating Review 
      .addCase(createReview.pending, (state) => {
        state.singleProductStatus = 'loading';
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.singleProductStatus = 'succeeded';
        state.isReviewSubmitted = true
      })
      .addCase(createReview.rejected, (state, action) => {
        state.singleProductStatus = 'failed';
        state.singleProductError = action.error.message;
      })

      //get all products by Admin Review 
      .addCase(adminProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(adminProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.products
      })
      .addCase(adminProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      //create Single product by Admin  
      .addCase(createSingleProduct.pending, (state) => {
        state.singleProductStatus = 'loading';
      })
      .addCase(createSingleProduct.fulfilled, (state, action) => {
        state.singleProductStatus = 'succeeded';
        state.product = action.payload.product;
        state.isProductCreated = true
      })
      .addCase(createSingleProduct.rejected, (state, action) => {
        state.singleProductStatus = 'failed';
        state.singleProductError = action.error.message;
        state.isProductCreated = false
      })

      //Delete Single product by Admin  
      .addCase(deleteSingleProduct.pending, (state) => {
        state.singleProductStatus = 'loading';
      })
      .addCase(deleteSingleProduct.fulfilled, (state, action) => {
        state.singleProductStatus = 'succeeded';
        state.isProductDeleted = true
      })
      .addCase(deleteSingleProduct.rejected, (state, action) => {
        state.singleProductStatus = 'failed';
        state.singleProductError = action.error.message;
        state.isProductDeleted = false
      })

      //Update Single product by Admin  
      .addCase(updateProduct.pending, (state) => {
        state.singleProductStatus = 'loading';
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.singleProductStatus = 'succeeded';
        state.isProductUpdated = true
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.singleProductStatus = 'failed';
        state.singleProductError = action.error.message;
        state.isProductUpdated = false
      })


      //get all reviews by Admin  
      .addCase(getReviewsByAdmin.pending, (state) => {
        state.singleProductStatus = 'loading';
      })
      .addCase(getReviewsByAdmin.fulfilled, (state, action) => {
        state.singleProductStatus = 'succeeded';
        state.reviews = action.payload.reviews
      })
      .addCase(getReviewsByAdmin.rejected, (state, action) => {
        state.singleProductStatus = 'failed';
        state.singleProductError = action.error.message;
      })

      //Delete reviews by Admin  
      .addCase(deleteReview.pending, (state) => {
        state.singleProductStatus = 'loading';
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.singleProductStatus = 'succeeded';
        state.isReviewDeleted = true
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.singleProductStatus = 'failed';
        state.isReviewDeleted = false
      });
  }
})
//products / admin
export const Products = (state) => state.products.products;
export const productStatus = (state) => state.products.status;
export const productError = (state) => state.products.error;

//product
export const SingleProduct = (state) => state.products.product;
export const SingleProductError = (state) => state.products.singleProductError;
export const SingleProductStatus = (state) => state.products.singleProductStatus;

//create product
export const IsProductCreated = (state) => state.products.isProductCreated;

//Delete product
export const IsProductDeleted = (state) => state.products.isProductDeleted;

//Update product
export const IsProductUpdated = (state) => state.products.isProductUpdated;

//review
export const IsReviewSubmitted = (state) => state.products.isReviewSubmitted;

//admin get all reviews
export const allReviews = (state) => state.products.reviews;
export const isReviewDeleted = (state) => state.products.isReviewDeleted;

export const { ClearIsReviewDeleted, ClearError, ClearReviewSubmmited, ClearProduct, ClearIsProductUpdated, ClearIsProductCreated, ClearIsProductDeleted } = productSlice.actions
export default productSlice.reducer