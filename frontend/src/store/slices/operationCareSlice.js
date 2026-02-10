import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../utils/axiosInstance'

// Async action to fetch all data
export const fetchOperationCares = createAsyncThunk('operationCare/fetchOperationCares', async () => {
  const response = await axiosInstance.get('/operation_care')
  return response.data
})

// Async action to fetch single data
export const fetchSingleOperationCare = createAsyncThunk('operationCare/fetchSingleOperationCare', async (id) => {
  const response = await axiosInstance.get(`/operation_care/${id}`)
  return response.data
})

// Async action to add single data
export const addOperationCare = createAsyncThunk('operationCare/addOperationCare', async (data) => {
  const response = await axiosInstance.post('/operation_care/', data)
  return response.data
})

// Async action to update single data
export const updateOperationCare = createAsyncThunk('operationCare/updateOperationCare', async (data) => {
  const { id, ...seperatedData } = data
  const response = await axiosInstance.put(`/operation_care/${id}`, seperatedData)
  return response.data
})

//------------------------------------------------------------------------------------------

// Async action to fetch all data
export const fetchPowerPlants = createAsyncThunk('operationCare/fetchPowerPlants', async () => {
  const response = await axiosInstance.get('/powerpoint')
  return response.data
})

// Async action to add single data
export const addPowerPlant = createAsyncThunk('operationCare/addPowerPlant', async (data) => {
  const response = await axiosInstance.post('/powerpoint/', data)
  return response.data
})

//------------------------------------------------------------------------------------------

// Async action to fetch all data
export const fetchPolls = createAsyncThunk('operationCare/fetchPolls', async () => {
  const response = await axiosInstance.get('/poll')
  return response.data
})

// Async action to add single data
export const addPoll = createAsyncThunk('operationCare/addPoll', async (data) => {
  const response = await axiosInstance.post('/poll/', data)
  return response.data
})

//------------------------------------------------------------------------------------------

// Async action to update single data
export const updateInventor = createAsyncThunk('operationCare/updateInventor', async (data) => {
  const { id, ...seperatedData } = data
  const response = await axiosInstance.put(`/inventor/${id}`, seperatedData)
  return response.data
})

//------------------------------------------------------------------------------------------

// Async action to update single data
export const updateString = createAsyncThunk('operationCare/updateString', async (data) => {
  const { id, ...seperatedData } = data
  const response = await axiosInstance.put(`/string/${id}`, seperatedData)
  return response.data
})

//------------------------------------------------------------------------------------------

// Async action to fetch all data
export const fetchFails = createAsyncThunk('operationCare/fetchFails', async () => {
  const response = await axiosInstance.get('/fail')
  return response.data
})

// Async action to add single data
export const addFail = createAsyncThunk('operationCare/addFail', async (data) => {
  let formData

  // Eğer data bir dosya içeriyorsa FormData kullan
  if (data.Fail_Bill_File) {
    formData = new FormData()
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key])
    })
  }

  // Eğer dosya yoksa data'yı olduğu gibi gönder
  const response = await axiosInstance.post('/fail/', formData || data, {
    headers: formData ? { 'Content-Type': 'multipart/form-data' } : {},
  })

  return response.data
})

// Async action to update single data
export const updateFail = createAsyncThunk('operationCare/updateFail', async (data) => {
  const { id, ...seperatedData } = data

  let formData

  // Eğer seperatedData bir dosya içeriyorsa FormData kullan
  if (seperatedData.Fail_Bill_File) {
    formData = new FormData()
    Object.keys(seperatedData).forEach((key) => {
      formData.append(key, seperatedData[key])
    })
  }

  // Eğer dosya yoksa seperatedData'yı olduğu gibi gönder
  const response = await axiosInstance.put(`/fail/${id}`, formData || seperatedData, {
    headers: formData ? { 'Content-Type': 'multipart/form-data' } : {},
  })

  return response.data
})

//------------------------------------------------------------------------------------------

const operationCareSlice = createSlice({
  name: 'operationCares',
  initialState: {
    singleOperationCare: null,
    operationCares: [],
    powerPlants: [],
    polls: [],
    fails: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch All Data

      .addCase(fetchOperationCares.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchOperationCares.fulfilled, (state, action) => {
        state.operationCares = action.payload
        state.loading = false
      })
      .addCase(fetchOperationCares.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // Fetch Single Data

      .addCase(fetchSingleOperationCare.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchSingleOperationCare.fulfilled, (state, action) => {
        state.singleOperationCare = action.payload
        state.loading = false
      })
      .addCase(fetchSingleOperationCare.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // Add Single Data

      .addCase(addOperationCare.pending, (state) => {
        state.loading = true
      })
      .addCase(addOperationCare.fulfilled, (state, action) => {
        state.operationCares = [action.payload, ...state.operationCares]
        state.loading = false
      })
      .addCase(addOperationCare.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // Update Single Data

      .addCase(updateOperationCare.pending, (state) => {
        state.loading = true
      })
      .addCase(updateOperationCare.fulfilled, (state, action) => {
        state.operationCares = state.operationCares.map((item) =>
          item.id === action.payload.id ? action.payload : item
        )
        state.loading = false
      })
      .addCase(updateOperationCare.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      //-------------------------------------------------------------------------------------------------------

      // Fetch All Data (for power plant)

      .addCase(fetchPowerPlants.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchPowerPlants.fulfilled, (state, action) => {
        state.powerPlants = action.payload
        state.loading = false
      })
      .addCase(fetchPowerPlants.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // Add Single Data (for power plant)

      .addCase(addPowerPlant.pending, (state) => {
        state.loading = true
      })
      .addCase(addPowerPlant.fulfilled, (state, action) => {
        state.powerPlants = [action.payload, ...state.powerPlants]
        state.loading = false
      })
      .addCase(addPowerPlant.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      //-------------------------------------------------------------------------------------------------------

      // Fetch All Data (for poll)

      .addCase(fetchPolls.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchPolls.fulfilled, (state, action) => {
        state.polls = action.payload
        state.loading = false
      })
      .addCase(fetchPolls.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // Add Single Data (for poll)

      .addCase(addPoll.pending, (state) => {
        state.loading = true
      })
      .addCase(addPoll.fulfilled, (state, action) => {
        state.polls = [...state.polls, action.payload]
        state.loading = false
      })
      .addCase(addPoll.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      //-------------------------------------------------------------------------------------------------------

      // Fetch All Data (for fail)

      .addCase(fetchFails.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchFails.fulfilled, (state, action) => {
        state.fails = action.payload
        state.loading = false
      })
      .addCase(fetchFails.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // Add Single Data (for fail)

      .addCase(addFail.pending, (state) => {
        state.loading = true
      })
      .addCase(addFail.fulfilled, (state, action) => {
        state.fails = [action.payload, ...state.fails]
        state.loading = false
      })
      .addCase(addFail.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // Update Single Data (for fail)

      .addCase(updateFail.pending, (state) => {
        state.loading = true
      })
      .addCase(updateFail.fulfilled, (state, action) => {
        state.fails = state.fails.map((item) => (item.id === action.payload.id ? action.payload : item))
        state.loading = false
      })
      .addCase(updateFail.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      //-------------------------------------------------------------------------------------------------------

      // Update Single Data (for string)

      .addCase(updateString.pending, (state) => {
        state.loading = true
      })
      .addCase(updateString.fulfilled, (state, action) => {
        state.singleOperationCare.operation_inventors = state.singleOperationCare.operation_inventors.map(
          (inventor) => {
            return {
              ...inventor,
              inventor_strings: inventor.inventor_strings.map((string) => {
                // Hedef id'yi bul ve güncelle
                if (string.id === action.payload.id) {
                  return action.payload
                }
                return string // Diğerleri olduğu gibi kalır
              }),
            }
          }
        )
        state.loading = false
      })
      .addCase(updateString.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

    //-------------------------------------------------------------------------------------------------------
  },
})

export default operationCareSlice.reducer
