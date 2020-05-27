import React from "react"
import Logo from "./Logo"
import DateTime from "./DateTime"
import Notifications from "./Notifications"
import LoginButton from "./LoginButton"

import "./Header.scss"

const ONE_MINUTE = 60 * 1000

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      now: Date.now()
    }
    // Note that since this component is mounted once and forever this is ok.
    setInterval(() => {
      this.setState({
        now: Date.now()
      })
    }, ONE_MINUTE)
  }

  render() {
    return (
      <div id="header-container">
        <Logo />
        <Notifications now={this.state.now} />
        <DateTime now={this.state.now} />
        <LoginButton />
      </div>
    )
  }
}
