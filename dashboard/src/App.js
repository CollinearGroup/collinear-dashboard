import React from "react"
import "./App.scss"

import Header from "./layout/Header"

import NpmMetrics from "./npm-metrics"
import Foosball from "./foosball/frontend"
import Photos from "./photos/Photos"
import MessageBoard from "./message-board/MessageBoard"
import ConfRoomSchedule from "./conference-room-schedule/ConfRoomSchedule"
import Kudos from "./kudos/Kudos"

export default function App() {
  return <GridContainer />
}

export class GridContainer extends React.Component {
  componentDidMount() {
    (function() {
      var mouseTimer = null, cursorVisible = true;
  
      function disappearCursor() {
          mouseTimer = null;
          document.body.style.cursor = "none";
          cursorVisible = false;
      }
  
      document.onmousemove = function() {
          if (mouseTimer) {
              window.clearTimeout(mouseTimer);
          }
          if (!cursorVisible) {
              document.body.style.cursor = "default";
              cursorVisible = true;
          }
          mouseTimer = window.setTimeout(disappearCursor, 5000);
      };
    })();
  }

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
        <PhotosWrapper />
        {this.wrapInId("foos", <Foosball />)}
        {this.wrapInId("npm", <NpmMetrics />)}
        <KudosWrapper />
        {this.wrapInId("message-board", <MessageBoard />)}
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

export class PhotosWrapper extends React.Component {
  render() {
    return (
      <div id="photo">
        <Photos />
      </div>
    )
  }
}

export class KudosWrapper extends React.Component {
  render() {
    return (
      <div id="kudos">
        <Kudos />
      </div>
    )
  }
}
