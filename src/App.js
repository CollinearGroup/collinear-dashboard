import React from "react"
import NpmMetrics from "./npm-metrics/NpmMetrics"
import "./App.scss"

function App() {
  return (
    <div className="App">
      <div className="widget"> Collinear Group Dashboard </div>
      <div className="widget"> <NpmMetrics /> </div>
      <div className="widget">  You're app here! </div>
      <div className="widget">  You're app here! </div>
      <div className="widget">  You're app here! </div>
      <div className="widget">  You're app here! </div>
      <div className="widget">  You're app here! </div>
    </div>
  )
}

export default App
