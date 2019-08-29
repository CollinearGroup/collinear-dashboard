import React, { useEffect } from "react"
import { setTime } from "./infoSlice"

export default function Info(props) {
  useEffect(() => {
    let dataRefreshInterval = setInterval(updateTime, 1000)
    return () => {
      clearInterval(dataRefreshInterval)
    }
  })

  function updateTime() {
    const payload = {
      time: new Date().toTimeString()
    }
    props.dispatch(setTime(payload))
  }

  return (
    <div>
      <p>Collinear Group Dashboard</p>
      <p> {props.time} </p>
    </div>
  )
}
