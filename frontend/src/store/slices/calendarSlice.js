import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../utils/axiosInstance'

// Async action to fetch all data
export const fetchCalendars = createAsyncThunk('calendar/fetchCalendars', async () => {
  const response = await axiosInstance.get('/calendar')
  return response.data
})

// Async action to add single data
export const addCalendar = createAsyncThunk('calendar/addCalendar', async (data) => {
  const response = await axiosInstance.post('/calendar/', data)
  return response.data
})

// Async action to update single data
export const updateCalendar = createAsyncThunk('calendar/updateCalendar', async (data) => {
  const { id, ...seperatedData } = data
  const response = await axiosInstance.put(`/calendar/${id}/`, seperatedData)
  return response.data
})

// Async action to delete single data
export const deleteCalendar = createAsyncThunk('calendar/deleteCalendar', async (dataId) => {
  await axiosInstance.delete(`/calendar/${dataId}/`)
  return dataId
})

const calendarSlice = createSlice({
  name: 'calendars',
  initialState: {
    calendars: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch All Data

      .addCase(fetchCalendars.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchCalendars.fulfilled, (state, action) => {
        state.calendars = action.payload
        state.loading = false
      })
      .addCase(fetchCalendars.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // Add Single Data

      .addCase(addCalendar.pending, (state) => {
        state.loading = true
      })
      .addCase(addCalendar.fulfilled, (state, action) => {
        state.calendars = [action.payload, ...state.calendars]
        state.loading = false
      })
      .addCase(addCalendar.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // Update Single Data

      .addCase(updateCalendar.pending, (state) => {
        state.loading = true
      })
      .addCase(updateCalendar.fulfilled, (state, action) => {
        state.calendars = state.calendars.map((item) => (item.id === action.payload.id ? action.payload : item))
        state.loading = false
      })
      .addCase(updateCalendar.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // Delete Single Data

      .addCase(deleteCalendar.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteCalendar.fulfilled, (state, action) => {
        state.calendars = state.calendars.filter((item) => item.id !== action.payload)
        state.loading = false
      })
      .addCase(deleteCalendar.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default calendarSlice.reducer
