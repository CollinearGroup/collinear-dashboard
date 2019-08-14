import React from "react"
import NpmMetrics from "./NpmMetrics"
import "./App.css"

function App() {
  return (
    <div className="App">
      <div className="widget"> Collinear Group Dashboard </div>
      <div className="widget">
        <NpmMetrics />
      </div>
    </div>
  )
}

export default App
