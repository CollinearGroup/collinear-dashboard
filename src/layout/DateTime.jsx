import React from "react"
import { getDate, getTime } from "./headerUtils"
export default class DateTime extends React.Component {
  render() {
    return (
      <div id="dateTime" className="padding justify-right">
        <div id="date">{getDate(new Date(Date.now()))}</div>
        <div class="vertical-separator"></div>
        <div id="time">{getTime(new Date(Date.now()))}</div>
      </div>
    )
  }
}
