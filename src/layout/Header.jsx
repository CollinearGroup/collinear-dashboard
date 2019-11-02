import React from "react"
import Logo from "./Logo"
import DateTime from "./DateTime"
import { getDay } from "./headerUtils"

import "./Header.scss"

export default class Header extends React.Component {
  render() {
    return (
      <div id="header-container">
        <Logo />
        <Notifications />
        <DateTime />
      </div>
    )
  }
}

// TODO: this is an unfinished feature
export class Notifications extends React.Component {
  render() {
    const weekday = getDay(Date.now())
    // TODO: change
    if (weekday !== "Friday") {
      return <div>{""}</div>
    }

    return (
      <div id="timesheet-notification" className="padding justify-right">
        ¡Timesheets due today!
      </div>
    )
  }
}
