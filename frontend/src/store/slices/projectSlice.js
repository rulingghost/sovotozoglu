import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../utils/axiosInstance'

// Async action to fetch all data
export const fetchProjects = createAsyncThunk('project/fetchProjects', async () => {
  const response = await axiosInstance.get('/project')
  return response.data
})

// Async action to fetch single data
export const fetchSingleProject = createAsyncThunk('project/fetchSingleProject', async (id) => {
  const response = await axiosInstance.get(`/project/${id}`)
  return response.data
})

// Async action to add single data
export const addProject = createAsyncThunk('project/addProject', async (data) => {
  const response = await axiosInstance.post('/project/', data)

  return response.data
})

// Async action to update single data
export const updateProject = createAsyncThunk('project/updateProject', async (data) => {
  const { id, ...seperatedData } = data
  const response = await axiosInstance.put(`/project/${id}`, seperatedData)
  return response.data
})

//------------------------------------------------------------------------------------------

// Async action to add single data
export const addProjectIncome = createAsyncThunk('project/addProjectIncome', async (data) => {
  const response = await axiosInstance.post('/income/', data)
  return response.data
})

// Async action to update single data
export const updateProjectIncome = createAsyncThunk('project/updateProjectIncome', async (data) => {
  const { id, ...seperatedData } = data
  const response = await axiosInstance.put(`/income/${id}`, seperatedData)
  return response.data
})

//------------------------------------------------------------------------------------------

// Async action to add single data
export const addProjectExpense = createAsyncThunk('project/addProjectExpense', async (data) => {
  const response = await axiosInstance.post('/expense/', data)
  return response.data
})

// Async action to update single data
export const updateProjectExpense = createAsyncThunk('project/updateProjectExpense', async (data) => {
  const { id, ...seperatedData } = data
  const response = await axiosInstance.put(`/expense/${id}`, seperatedData)
  return response.data
})

//------------------------------------------------------------------------------------------

// Async action to add single data
export const addProjectJobHistory = createAsyncThunk('project/addProjectJobHistory', async (data) => {
  const response = await axiosInstance.post('/job_history/', data)
  return response.data
})

// Async action to update single data
export const updateProjectJobHistory = createAsyncThunk('project/updateProjectJobHistory', async (data) => {
  const { id, ...seperatedData } = data
  const response = await axiosInstance.put(`/job_history/${id}`, seperatedData)
  return response.data
})

const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
    singleProject: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch All Data

      .addCase(fetchProjects.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload
        state.loading = false
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // Fetch Single Data

      .addCase(fetchSingleProject.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchSingleProject.fulfilled, (state, action) => {
        state.singleProject = action.payload
        state.loading = false
      })
      .addCase(fetchSingleProject.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // Add Single Data

      .addCase(addProject.pending, (state) => {
        state.loading = true
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.projects = [action.payload, ...state.projects]
        state.loading = false
      })
      .addCase(addProject.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // Update Single Data

      .addCase(updateProject.pending, (state) => {
        state.loading = true
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.projects = state.projects.map((item) => (item.id === action.payload.id ? action.payload : item))
        state.loading = false
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      //-------------------------------------------------------------------------------------------------------

      // Add Single Data (for income)

      .addCase(addProjectIncome.pending, (state) => {
        state.loading = true
      })
      .addCase(addProjectIncome.fulfilled, (state, action) => {
        state.singleProject.project_incomes = [action.payload, ...state.singleProject.project_incomes]
        state.loading = false
      })
      .addCase(addProjectIncome.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // Update Single Data (for income)

      .addCase(updateProjectIncome.pending, (state) => {
        state.loading = true
      })
      .addCase(updateProjectIncome.fulfilled, (state, action) => {
        state.singleProject.project_incomes = state.singleProject.project_incomes.map((item) =>
          item.id === action.payload.id ? action.payload : item
        )
        state.loading = false
      })
      .addCase(updateProjectIncome.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      //-------------------------------------------------------------------------------------------------------

      // Add Single Data (for expense)

      .addCase(addProjectExpense.pending, (state) => {
        state.loading = true
      })
      .addCase(addProjectExpense.fulfilled, (state, action) => {
        state.singleProject.project_expenses = [action.payload, ...state.singleProject.project_expenses]
        state.loading = false
      })
      .addCase(addProjectExpense.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // Update Single Data (for expense)

      .addCase(updateProjectExpense.pending, (state) => {
        state.loading = true
      })
      .addCase(updateProjectExpense.fulfilled, (state, action) => {
        state.singleProject.project_expenses = state.singleProject.project_expenses.map((item) =>
          item.id === action.payload.id ? action.payload : item
        )
        state.loading = false
      })
      .addCase(updateProjectExpense.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // //-------------------------------------------------------------------------------------------------------

      // Add Single Data (for job history)

      .addCase(addProjectJobHistory.pending, (state) => {
        state.loading = true
      })
      .addCase(addProjectJobHistory.fulfilled, (state, action) => {
        state.singleProject.project_jobhistories = [action.payload, ...state.singleProject.project_jobhistories]
        state.loading = false
      })
      .addCase(addProjectJobHistory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // Update Single Data (for job history)

      .addCase(updateProjectJobHistory.pending, (state) => {
        state.loading = true
      })
      .addCase(updateProjectJobHistory.fulfilled, (state, action) => {
        state.singleProject.project_jobhistories = state.singleProject.project_jobhistories.map((item) =>
          item.id === action.payload.id ? action.payload : item
        )
        state.loading = false
      })
      .addCase(updateProjectJobHistory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default projectSlice.reducer
