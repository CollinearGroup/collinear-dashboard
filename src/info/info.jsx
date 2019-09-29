import React, { useEffect } from "react"
import { setTime } from "./infoSlice"
import { getDate, getTime } from "./infoUtils"
import "./info.scss"
import logo from "./collinear-logo.png"

export default function Info(props) {
  useEffect(() => {
    let dataRefreshInterval = setInterval(updateTime, 1000)
    return () => {
      clearInterval(dataRefreshInterval)
    }
  })

  function updateTime() {
    let now = new Date()
    const payload = {
      date: getDate(now),
      time: getTime(now)
    }
    props.dispatch(setTime(payload))
  }

  return (
    <div id="info">
      <div id="logo-box">
        <img id="logo" src={logo} alt="Logo" />
      </div>
      <div id="date">{props.date}</div>
      <div id="time">{props.time}</div>
    </div>
  )
}
