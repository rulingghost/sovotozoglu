import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../utils/axiosInstance'

// Objeden file kolonlarını kaldırmak için, yoksa api hata veriyor
const removeFileColumns = (data) => {
  const editedData = Object.keys(data)
    .filter((key) => !key.includes('File'))
    .reduce((acc, key) => ({ ...acc, [key]: data[key] }), {})

  return editedData
}

// Async action to fetch all data
export const fetchSalesOffers = createAsyncThunk('salesOffer/fetchSalesOffers', async () => {
  const response = await axiosInstance.get('/sales_offer')
  return response.data
})

// Async action to add single data
export const addSalesOffer = createAsyncThunk('salesOffer/addSalesOffer', async (data) => {
  const response = await axiosInstance.post('/sales_offer/', data)
  return response.data
})

// Async action to update single data (without file)
export const updateSalesOffer = createAsyncThunk('salesOffer/updateSalesOffer', async (data) => {
  const { id, ...seperatedData } = data
  const response = await axiosInstance.put(`/sales_offer/${id}`, removeFileColumns(seperatedData))
  return response.data
})

// Async action to update single data (with file)
export const updateSalesOfferWithFile = createAsyncThunk('salesOffer/updateSalesOfferWithFile', async (data) => {
  const { id, ...seperatedData } = data
  const response = await axiosInstance.put(`/sales_offer/${id}`, seperatedData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
})

// Async action to add single data (for revise)
export const addSalesOfferRevise = createAsyncThunk('salesOffer/addSalesOfferRevise', async (data) => {
  const response = await axiosInstance.post('/sales_offer_revise/', removeFileColumns(data))
  return response.data
})

// --------------------------------------------------------------------------------------------------------

// Async action to fetch all data
export const fetchPersonRelateds = createAsyncThunk('salesOffer/fetchPersonRelateds', async () => {
  const response = await axiosInstance.get('/person-related')
  return response.data
})

// Async action to add single data
export const addPersonRelated = createAsyncThunk('salesOffer/addPersonRelated', async (data) => {
  const response = await axiosInstance.post('/person-related/', data)
  return response.data
})

const salesOfferSlice = createSlice({
  name: 'salesOffers',
  initialState: {
    salesOffers: [],
    personRelateds: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch All Data

      .addCase(fetchSalesOffers.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchSalesOffers.fulfilled, (state, action) => {
        state.salesOffers = action.payload
        state.loading = false
      })
      .addCase(fetchSalesOffers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // Add Single Data

      .addCase(addSalesOffer.pending, (state) => {
        state.loading = true
      })
      .addCase(addSalesOffer.fulfilled, (state, action) => {
        state.salesOffers = [action.payload, ...state.salesOffers]
        state.loading = false
      })
      .addCase(addSalesOffer.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // Update Single Data

      .addCase(updateSalesOffer.pending, (state) => {
        state.loading = true
      })
      .addCase(updateSalesOffer.fulfilled, (state, action) => {
        state.salesOffers = state.salesOffers.map((item) => (item.id === action.payload.id ? action.payload : item))
        state.loading = false
      })
      .addCase(updateSalesOffer.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // Update Single Data (with file)

      .addCase(updateSalesOfferWithFile.pending, (state) => {
        state.loading = true
      })
      .addCase(updateSalesOfferWithFile.fulfilled, (state, action) => {
        state.salesOffers = state.salesOffers.map((item) => (item.id === action.payload.id ? action.payload : item))
        state.loading = false
      })
      .addCase(updateSalesOfferWithFile.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // Add Single Data (for revise)

      .addCase(addSalesOfferRevise.pending, (state) => {
        state.loading = true
      })
      .addCase(addSalesOfferRevise.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(addSalesOfferRevise.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      //---------------------------------------------------------------------

      // Fetch All Data (for person related)

      .addCase(fetchPersonRelateds.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchPersonRelateds.fulfilled, (state, action) => {
        state.personRelateds = action.payload
        state.loading = false
      })
      .addCase(fetchPersonRelateds.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // Add Single Data (for person related)

      .addCase(addPersonRelated.pending, (state) => {
        state.loading = true
      })
      .addCase(addPersonRelated.fulfilled, (state, action) => {
        state.personRelateds = [action.payload, ...state.personRelateds]
        state.loading = false
      })
      .addCase(addPersonRelated.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default salesOfferSlice.reducer
