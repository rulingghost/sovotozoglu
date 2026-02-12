import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../utils/axiosInstance'

// Async action to fetch all data
export const fetchSuppliers = createAsyncThunk('supplier/fetchSuppliers', async () => {
  const response = await axiosInstance.get('/supplier')
  return response.data
})

// Async action to add single data
export const addSupplier = createAsyncThunk('supplier/addSupplier', async (data) => {
  const response = await axiosInstance.post('/supplier/', data)
  return response.data
})

// Async action to update single data
export const updateSupplier = createAsyncThunk('supplier/updateSupplier', async (data) => {
  const { id, ...seperatedData } = data
  const response = await axiosInstance.put(`/supplier/${id}`, seperatedData)
  return response.data
})

const supplierSlice = createSlice({
  name: 'suppliers',
  initialState: {
    suppliers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch All Data

      .addCase(fetchSuppliers.pending, (state) => {
        if (state.suppliers.length === 0) {
          state.loading = true
        }
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.suppliers = action.payload
        state.loading = false
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // Add Single Data

      .addCase(addSupplier.pending, (state) => {
        state.loading = true
      })
      .addCase(addSupplier.fulfilled, (state, action) => {
        state.suppliers = [action.payload, ...state.suppliers]
        state.loading = false
      })
      .addCase(addSupplier.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // Update Single Data

      .addCase(updateSupplier.pending, (state) => {
        state.loading = true
      })
      .addCase(updateSupplier.fulfilled, (state, action) => {
        state.suppliers = state.suppliers.map((item) => (item.id === action.payload.id ? action.payload : item))
        state.loading = false
      })
      .addCase(updateSupplier.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default supplierSlice.reducer
