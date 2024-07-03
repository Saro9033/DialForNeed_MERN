import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slices/ProductsSlice'
import CategoryReducer from './slices/CategorySlice'
import BrandReducer from './slices/BrandSlice'
import authReducer from './slices/authSlice'
import CartReducer from './slices/CartSlice'
import orderReducer from './slices/orderSlice'
import AdminUserReducer from './slices/AdminUserSlice'
import EmployeeReducer from './slices/EmployeeSlice'
import TaskReducer from './slices/TaskSlice'
import CarouselReducer from './slices/CarouselSlice'

export const Store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: { warnAfter: 128 },
        serializableCheck: { warnAfter: 128 },
    }),

    reducer: {
        products: productReducer,
        category: CategoryReducer,
        brand: BrandReducer,
        auth: authReducer,
        cart: CartReducer,
        order: orderReducer,
        users:AdminUserReducer,
        employee:EmployeeReducer,
        task:TaskReducer,
        carousel:CarouselReducer
    }
})