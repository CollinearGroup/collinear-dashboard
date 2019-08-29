import React from "react"
import "./App.scss"

// Import your plugin
import NpmMetrics from "./npm-metrics"
import Info from "./info"

// Add your plugin
export default function App(props) {
  return (
    <div className="App">
      <div className="widget">
        <Info />
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
