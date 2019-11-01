import React from "react"
import Logo from "./Logo"

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

export class Notifications extends React.Component {
  render() {
    return (
      <div id="" className="padding justify-right">
        I AM A
      </div>
    )
  }
}

export class DateTime extends React.Component {
  render() {
    return (
      <div id="" className="padding justify-right">
        Date Time
      </div>
    )
  }
}
