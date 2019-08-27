import React from "react"
import ReactDOM from "react-dom"
import "./index.scss"
import App, { reducers } from "./App";
import { configureStore } from "redux-starter-kit"
import { Provider } from "react-redux"

// TODO
// import { reducer } from "./info"

const store = configureStore({
  reducer: reducers.infoReducer
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
