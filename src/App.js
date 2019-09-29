import React from "react"
import "./App.scss"
import _ from "lodash"

// Import your plugin
import NpmMetrics from "./npm-metrics"
import Info from "./info"

// Add your plugin
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
    let INTERVAL_TIME_MS = 10 * 1000
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
    let { sideBarPosition } = this.state
    return (
      <div className={`grid-layout-${sideBarPosition}`}>
        <MainContent />
        <SideBar />
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
  function getPlaceholder() {
    return <div>Your app here!</div>
  }
  return (
    <div className="grid-main">
      <div className="stretch box">{getPlaceholder()}</div>
      <div className="box">
        <NpmMetrics />
      </div>
      <div className="box">{getPlaceholder()}</div>
      <div className="stretch box">{getPlaceholder()}</div>
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
    <div>
      <h2>Collinear Software Engineering</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
        nemo odit ipsam impedit reprehenderit laudantium cum corporis,
        laboriosam optio? Possimus cumque consequatur in minima? Dolore
        reiciendis laborum amet, perspiciatis minus est fugit, similique rerum,
        vero sit velit officia? Facilis, quidem dolore. Voluptate commodi
        repudiandae deserunt reprehenderit unde, nam aut dolorem.
      </p>
    </div>
  )
}
