import React from "react"
import { getDay } from "./headerUtils"

export default class Notifications extends React.Component {
  isThursday = now => {
    const weekday = getDay(now)
    return weekday === "Thursday"
  }

  getThursdayBanner = () => {
    return (
      <div class="timesheets-ribbon">
        <span class="timesheets-message uppercase">
          ! Timesheets due today !
        </span>
      </div>
    )
  }

  getContent = now => {
    if (!this.isThursday(now)) {
      return <div>{""}</div>
    }
    return this.getThursdayBanner()
  }

  render() {
    return (
      <div id="timesheets-notification" className="padding justify-right">
        {this.getContent(this.props.now)}
      </div>
    )
  }
}
