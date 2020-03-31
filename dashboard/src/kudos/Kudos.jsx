import React, { Component } from "react"
import { get } from "axios"
import "./kudos.css"

const URL = "http://localhost:8080/kudo"

class Kudos extends Component {
  state = {
    kudos: []
  }
  componentDidMount = async () => {
    const results = await get(URL)
    this.setState({ kudos: results.data._embedded.kudo })
  }
  render() {
    return (
      <div id="kudos">
        <div id="title-bar">
          {this.renderTitle()}
          {this.renderCount()}
        </div>
        <br/>
        {this.state.kudos[0] && this.renderKudo(this.state.kudos[0])}
        {/* <pre>{JSON.stringify(this.state.kudos, null, " ")}</pre> */}
      </div>
    )
  }

  renderTitle = () => {
    return <div id="title">Weekly Kudos</div>
  }

  renderCount = () => {
    return <div id="message-tracking-display">Showing X of Y</div>
  }

  renderKudo = kudo => {
    return (
      <div id="kudo-container">
        <div id="kudo-float-container">
          <div id="kudo-message">"{kudo.message}"</div>
          <br/>
          <div id="kudo-from">- {kudo.from || "Anonymous"}</div>
        </div>
      </div>
    )
  }
}

export default Kudos
