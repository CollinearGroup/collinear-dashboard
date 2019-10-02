import React from "react"
import "./App.scss"

// Import your plugin
import NpmMetrics from "./npm-metrics"
import Info from "./info"
import FoosBall from "./foosball"
import SocialMediaPhotos from "./SocialMediaPhotos/SocialMediaPhotos"
import ConfRoomSchedule from "./conference-room-schedule/ConfRoomSchedule"

export default function App() {
  return <GridContainer />
}

export class GridContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sideBarPosition: "right"
    }
  }

  componentDidMount() {
    let INTERVAL_TIME_MS = 2 * 60 * 1000
    this.updateDisplayInterval = setInterval(() => {
      this.setState({
        sideBarPosition: this.togglePosition()
      })
    }, INTERVAL_TIME_MS)
  }

  componentWillUnmount() {
    clearInterval(this.updateDisplayInterval)
  }

  render() {
    let fullSceenDream = {
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%"
    }
    let { sideBarPosition } = this.state
    return (
      <div style={fullSceenDream}>
        <div className={`grid-layout-${sideBarPosition}`}>
          <MainContent />
          <SideBar />
        </div>
      </div>
    )
  }

  togglePosition() {
    if (this.state.sideBarPosition === "right") {
      return "left"
    }
    return "right"
  }
}

export function MainContent() {
  return (
    <div className="grid-main">
      <div className="stretch box">
        <ConfRoomSchedule />
      </div>
      <div className="box">
        <NpmMetrics />
      </div>
      <div className="stretch box">
        <FoosBall />
      </div>
      <div className="box">
        <SocialMediaPhotos />
      </div>
    </div>
  )
}

export function SideBar() {
  return (
    <div className="grid-sidebar">
      <div className="box">
        <Mission />
      </div>
      <div className="box">
        <Info />
      </div>
    </div>
  )
}

export function Mission() {
  return (
    <div id="mission">
      <h2>The Collinear Group Foundation</h2>
      <p>Focus on Service</p>
      <p>Focus on Excellence</p>
      <p>Hire and Retain the Best People</p>
      <p>Have Fun</p>
    </div>
  )
}
