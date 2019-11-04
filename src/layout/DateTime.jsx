import React from "react"
import { getDate, getTime } from "./headerUtils"

export default class DateTime extends React.Component {
  render() {
    const { now } = this.props
    const date = getDate(now)
    const time = getTime(now)

    return (
      <div id="dateTime" className="padding">
        <div id="dt-content">
          <strong>{date}</strong>
          <span class="vertical-separator"></span>
          <span>{time}</span>
        </div>
      </div>
    )
  }
}
