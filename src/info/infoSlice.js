import { createSlice } from "redux-starter-kit"

const infoSlice = createSlice({
  slice: "info",
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

export const { setTime } = infoSlice.actions

export default infoSlice.reducer
