import React from "react"
import NpmMetrics from "./npm-metrics/NpmMetrics"
import "./App.css"

function App() {
  return (
    <div className="App">
      <div className="widget"> Collinear Group Dashboard </div>
      <div className="widget"> <NpmMetrics /> </div>
      <div className="widget">  </div>
      <div className="widget">  </div>
      <div className="widget">  </div>
      <div className="widget">  </div>
      <div className="widget">  </div>
    </div>
  )
}

export default App
