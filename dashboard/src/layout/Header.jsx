import React from "react"
import Logo from "./Logo"
import DateTime from "./DateTime"
import Notifications from "./Notifications"
import LoginButton from "./LoginButton"
import { useSelector } from 'react-redux';

import "./Header.scss"

const ONE_MINUTE = 60 * 1000


export default function Header() {

  const [now, setNow] = React.useState(Date.now());
  const loggedIn = useSelector(state => state.loggedIn);

  setInterval(() => {
    setNow(Date.now())
  }, ONE_MINUTE);

  return loggedIn ?
    (
      <div id="header-container-signed-in">
        <Logo />
        <Notifications now={now} />
        <DateTime now={now} />
      </div>
    ) :
    (
      <div id="header-container">
        <Logo />
        <Notifications now={now} />
        <DateTime now={now} />
        <LoginButton />
      </div>
    )
}
