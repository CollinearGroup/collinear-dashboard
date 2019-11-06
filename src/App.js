import React from "react"
import "./App.scss"

import Header from "./layout/Header"
import Footer from "./layout/Footer"

import NpmMetrics from "./npm-metrics"
import Foosball from "./foosball/frontend"
import SocialMediaPhotos from "./SocialMediaPhotos/SocialMediaPhotos"
import ConfRoomSchedule from "./conference-room-schedule/ConfRoomSchedule"

export default function App() {
  return <GridContainer />
}

export class GridContainer extends React.Component {
  wrapInId = (id, component) => {
    return (
      <div id={id} className="box padding">
        {component}
      </div>
    )
  }

  render() {
    return (
      <div id="container">
        <HeaderWrapper />
        {this.wrapInId("calendar", <ConfRoomSchedule />)}
        <Photos />
        {this.wrapInId("foos", <FoosBall />)}
        {this.wrapInId("npm", <NpmMetrics />)}
        <Kudos />
        {this.wrapInId("message-board", <div>Message Board Placeholder</div>)}
        <Footer />
      </div>
    )
  }
}

export class HeaderWrapper extends React.Component {
  render() {
    return (
      <div id="header">
        <Header />
      </div>
    )
  }
}

export class Photos extends React.Component {
  render() {
    return (
      <div id="photo">
        <SocialMediaPhotos />
      </div>
}

export class Kudos extends React.Component {
  render() {
    return (
      <div id="kudos">
        <p>Kudos Placeholder</p>
      </div>
    )
  }
}
