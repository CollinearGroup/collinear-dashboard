import React from "react"
import { connect } from "react-redux"
import NpmMetrics from "./npm-metrics/NpmMetrics"
import "./App.scss"

const mapStateToProps = (state) => {
  return { ...state }
}

function App(props) {
  return (
    <div className="App">
      <div className="widget">
        <p>Collinear Group Dashboard</p>
        <p> {props.time} </p>
      </div>
      <div className="widget">
        <NpmMetrics />
      </div>
      <div className="widget"> You're app here! </div>
      <div className="widget"> You're app here! </div>
      <div className="widget"> You're app here! </div>
      <div className="widget"> You're app here! </div>
      <div className="widget"> You're app here! </div>
    </div>
  )
}

export default connect(mapStateToProps)(App)
