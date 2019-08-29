import React from "react"
import { configureStore } from "redux-starter-kit"
import { Provider } from "react-redux"

import ConnectedInfo from "./infoContainer"
import reducer from "./infoSlice"

const store = configureStore({
  reducer
})

export default function Info() {
  return (
    <Provider store={store}>
      <ConnectedInfo />
    </Provider>
  )
}
