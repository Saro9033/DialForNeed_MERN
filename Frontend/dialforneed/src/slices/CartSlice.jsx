import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../API";


export const increaseCartItemQty = createAction("cart/increaseCartItemQty");
export const decreaseCartItemQty = createAction("cart/decreaseCartItemQty");
export const removeCartItem = createAction("cart/removeCartItem");
export const OrderCompleted = createAction("cart/OrderCompleted");

// Async thunk to add item to the cart
export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async ({ productId, quantity }, thunkAPI) => {
    try {
      const response = await API.get(`/product/${productId}`);
      const productData = response.data.product;

      const newItem = {
        productId: productData._id,
        name: productData.name,
        price: productData.price,
        type: productData.type,
        image: productData.images.length > 0 ? productData.images[0].image : null,
        quantity,
        stock:productData.stock
      };

      console.log(newItem)

      return newItem; // Return the newItem to be added to the cart
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
    }
  }
);

// CartSlice definition
const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        const newItem = action.payload;
        const isItemExist = state.items.find(item => item.productId === newItem.productId);

        if (isItemExist) {
          state.status = 'failed'; // Set status to indicate failure (if needed)
        } else {
          state.items = [...state.items, newItem];
          state.status = 'succeeded';
          localStorage.setItem('cartItems', JSON.stringify(state.items));
        }
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to add item to cart';
      })


      //increase quantity 
      .addCase(increaseCartItemQty, (state, action) => {
        state.items = state.items.map((item) => {
          if (item.productId === action.payload) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      })
      .addCase(decreaseCartItemQty, (state, action) => {
        state.items = state.items.map((item) => {
          if (item.productId === action.payload && item.quantity > 1) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
          return item;
        });
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      })

      //remove item from cart
      .addCase(removeCartItem, (state, action) => {
        const filteredItems = state.items.filter((item) => item.productId !== action.payload);
        localStorage.setItem("cartItems", JSON.stringify(filteredItems));
        return {
          ...state,
          items: filteredItems,
        };
      })

      //OrderCompleted and reset values to empty
      .addCase(OrderCompleted, (state, action) => {
        localStorage.removeItem("cartItems");
        sessionStorage.removeItem('orderInfo')
        return {
          ...state,
          items:[] 
        };
      });
  }
});

// Exporting the selector functions
export const cartItems = (state) => state.cart.items;
export const cartStatus = (state) => state.cart.status;
export const cartError = (state) => state.cart.error;

// Exporting the reducer function
export default CartSlice.reducer;

