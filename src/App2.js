import React from "react"
import "./App.scss"

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
      <div id={id} className="box">
        {component}
      </div>
    )
  }

  render() {
    return (
      <div id="container">
        {this.wrapInId("header", <Header />)}
        {this.wrapInId("calendar", <ConfRoomSchedule />)}
        {this.wrapInId("photo", <SocialMediaPhotos />)}
        {this.wrapInId("foos", <Foosball />)}
        {this.wrapInId("npm", <NpmMetrics />)}
        {this.wrapInId("kudos", <div>Placeholder</div>)}
        {this.wrapInId("message-board", <div>Placeholder</div>)}
        {this.wrapInId("footer", <div>Footer!</div>)}
      </div>
    )
  }
}

export class Header extends React.Component {
  render() {
    return "I AM A HEADER"
  }
}
