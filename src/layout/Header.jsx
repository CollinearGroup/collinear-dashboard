import React from "react"
import Logo from "./Logo"
import DateTime from "./DateTime"

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
    return (
      <div id="" className="padding justify-right">
        {" "}
      </div>
    )
  }
}
