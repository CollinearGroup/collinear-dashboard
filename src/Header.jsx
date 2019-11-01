import React from "react"
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

export class Logo extends React.Component {
  render() {
    return <div>Collinear</div>
  }
}

export class Notifications extends React.Component {
  render() {
    return (
      <div id="" className="justify-right">
        I AM A
      </div>
    )
  }
}

export class DateTime extends React.Component {
  render() {
    return (
      <div id="" className="justify-right">
        Date Time
      </div>
    )
  }
}
