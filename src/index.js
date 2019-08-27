import React from "react"
import ReactDOM from "react-dom"
import "./index.scss"
import App from "./App"
import { configureStore, createSlice } from "redux-starter-kit"
import { Provider } from "react-redux"

// Create a default action with name, payload
const { actions, reducer } = createSlice({
  initialState: {
    time: new Date().toTimeString(),
    id: Date.now()
  },
  reducers: {
    setTime: (state, { payload }) => {
      // TODO: validate props?
      return payload
    }
  }
})
const { setTime } = actions

// Configure store
const store = configureStore({
  reducer: reducer
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)

// Drive some default updates
setInterval(() => {
  const payload = {
    time: new Date().toTimeString(),
    id: Date.now()
  }
  store.dispatch(setTime(payload))
}, 1000)
