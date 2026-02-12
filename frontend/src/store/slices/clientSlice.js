import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../utils/axiosInstance'

// Async action to fetch all data
export const fetchClients = createAsyncThunk('client/fetchClients', async () => {
  const response = await axiosInstance.get('/client')
  return response.data
})

// Async action to add single data
export const addClient = createAsyncThunk('client/addClient', async (data) => {
  const response = await axiosInstance.post('/client/', data)
  return response.data
})

// Async action to update single data
export const updateClient = createAsyncThunk('client/updateClient', async (data) => {
  const { id, ...seperatedData } = data
  const response = await axiosInstance.put(`/client/${id}`, seperatedData)
  return response.data
})

// // Async action to delete single data
// export const deleteClient = createAsyncThunk('client/deleteClient', async (dataId) => {
//   await axiosInstance.delete(`/client/${dataId}`)
//   return clientId
// })

const clientSlice = createSlice({
  name: 'clients',
  initialState: {
    clients: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch All Data

      .addCase(fetchClients.pending, (state) => {
        if (state.clients.length === 0) {
          state.loading = true
        }
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.clients = action.payload
        state.loading = false
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // Add Single Data

      .addCase(addClient.pending, (state) => {
        state.loading = true
      })
      .addCase(addClient.fulfilled, (state, action) => {
        state.clients = [action.payload, ...state.clients]
        state.loading = false
      })
      .addCase(addClient.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // Update Single Data

      .addCase(updateClient.pending, (state) => {
        state.loading = true
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        state.clients = state.clients.map((item) => (item.id === action.payload.id ? action.payload : item))
        state.loading = false
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

    // // Delete Single Data

    // .addCase(deleteClient.pending, (state) => {
    //   state.loading = true
    // })
    // .addCase(deleteClient.fulfilled, (state, action) => {
    //   state.clients = state.clients.filter((item) => item.id !== action.payload)
    //   state.loading = false
    // })
    // .addCase(deleteClient.rejected, (state, action) => {
    //   state.loading = false
    //   state.error = action.error.message
    // })
  },
})

export default clientSlice.reducer
