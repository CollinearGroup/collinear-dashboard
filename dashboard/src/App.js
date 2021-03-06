import React from "react"
import { Provider, useSelector } from 'react-redux'
import "./App.scss"

import Header from "./layout/Header"

import NpmMetrics from "./npm-metrics"
import Foosball from "./foosball"
import Photos from "./photos/Photos"
import MessageBoard from "./message-board/MessageBoard"
import ConfRoomSchedule from "./conference-room-schedule/ConfRoomSchedule"
import Kudos from "./kudos/KudosContainer"

import configureStore from './store';

export default function App() {
  return <Provider store={configureStore()}>
    <GridContainer />
  </Provider>
}


function FoosballWrapper() {
  const isLoggedIn = useSelector(state => state.loggedIn);

  return (
    <div id="foos" className="box padding">
      <Foosball isLoggedIn={isLoggedIn}></Foosball>
    </div>
  )
}

function KudosWrapper() {
  const isLoggedIn = useSelector(state => state.loggedIn);

  return (
    <div id="kudos">
      <Kudos isLoggedIn={isLoggedIn} />
    </div>
  )
}

function MessageBoardWrapper() {
  const isLoggedIn = useSelector(state => state.loggedIn);

  return (
    <div id="message-board" className="box padding">
      <MessageBoard isLoggedIn={isLoggedIn} />
    </div>
  )
}

function PhotosWrapper() {
  const isLoggedIn = useSelector(state => state.loggedIn);

  return (
    <div id="photo">
      <Photos isLoggedIn={isLoggedIn} />
    </div>
  )
}

export class GridContainer extends React.Component {
  componentDidMount() {
    (function () {
      var mouseTimer = null, cursorVisible = true;

      function disappearCursor() {
        mouseTimer = null;
        document.body.style.cursor = "none";
        cursorVisible = false;
      }

      document.onmousemove = function () {
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
        <FoosballWrapper />
        {this.wrapInId("npm", <NpmMetrics />)}
        <KudosWrapper />
        <MessageBoardWrapper />
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

