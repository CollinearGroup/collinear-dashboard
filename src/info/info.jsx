import React, { useEffect } from "react"
import { setTime } from "./infoSlice"

export default function App(props) {
  // TODO: this doesn't seem like the best....
  useEffect(() => {
    // Drive some default updates
    let dataRefreshInterval = setInterval(() => {
      const payload = {
        time: new Date().toTimeString()
      }
      props.dispatch(setTime(payload))
    }, 1000)

    return () => {
      clearInterval(dataRefreshInterval)
    }
  })

  return (
    <div>
      <p>Collinear Group Dashboard</p>
      <p> {props.time} </p>
    </div>
  )
}
