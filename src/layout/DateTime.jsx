import React from "react"
import { getDate, getTime } from "./headerUtils"

const ONE_MINUTE = 60 * 1000

export default class DateTime extends React.Component {
  constructor(props) {
    super(props)
    const now = Date.now()
    this.state = {
      date: getDate(now),
      time: getTime(now)
    }

    // Note that since this component is mounted once and forever this is ok.
    setInterval(() => {
      const now = Date.now()
      this.setState({
        date: getDate(now),
        time: getTime(now)
      })
    }, ONE_MINUTE)
  }

  render() {
    return (
      <div id="dateTime" className="padding justify-right">
        <div id="dt-content">
          <strong>{this.state.date}</strong>
          <span class="vertical-separator"></span>
          <span>{this.state.time}</span>
        </div>
      </div>
    )
  }
}
