import { configureStore } from '@reduxjs/toolkit'
import clientSlice from './slices/clientSlice'
import supplierSlice from './slices/supplierSlice'
import projectSlice from './slices/projectSlice'
import salesOfferSlice from './slices/salesOfferSlice'
import operationCareSlice from './slices/operationCareSlice'
import calendarSlice from './slices/calendarSlice'

const store = configureStore({
  reducer: {
    client: clientSlice,
    supplier: supplierSlice,
    project: projectSlice,
    calendar: calendarSlice,
    salesOffer: salesOfferSlice,
    operationCare: operationCareSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Bu satır serializable state check'i devre dışı bırakır, silinecek!
    }),
})

export default store
