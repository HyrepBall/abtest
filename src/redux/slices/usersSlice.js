import { createSlice } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    value: [],
    calculatedRR7Value: null,
  },
  reducers: {
    saveUsers: (state, action) => {
      state.value = action.payload
    },
    calculateRR7days: (state, action) => {
      state.calculatedRR7Value = action.payload
    }
  }
})

export const { saveUsers, calculateRR7days } = usersSlice.actions
export default usersSlice.reducer