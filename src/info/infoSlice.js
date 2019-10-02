import { createSlice } from "redux-starter-kit"
import { getDate, getTime } from "./infoUtils"

let now = new Date()
const infoSlice = createSlice({
  slice: "info",
  initialState: {
    date: getDate(now),
    time: getTime(now)
  },
  reducers: {
    setTime(state, action) {
      // TODO: should be using state.info.{date, time}
      const { date, time } = action.payload
      state.time = time
      state.date = date
    }
  }
})

export const { setTime } = infoSlice.actions

export default infoSlice.reducer
