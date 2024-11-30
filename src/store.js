import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../src/slices/authSlices'

const store = configureStore({
  reducer: {
    user: authSlice
  }
})
export default store