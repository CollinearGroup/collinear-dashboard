import { createSlice } from "redux-starter-kit"

const appSlice = createSlice({
  slice: "app",
  initialState: {
    value: new Date().toTimeString()
  },
  reducers: {
    setTime(state, action) {
      const { time } = action.payload
      state.value = time
    }
  }
})

export const { setTime } = appSlice.actions

export default appSlice.reducer
