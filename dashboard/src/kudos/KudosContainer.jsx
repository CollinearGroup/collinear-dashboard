import React, { Component } from "react"
import { get } from "axios"
import "./kudos.css"
import TitleBar from "./TitleBar"
import Kudo from "./Kudo"

// TODO
const URL = "http://localhost:8080/kudo"

class KudosContainer extends Component {
  state = {
    kudos: [],
    displayedIndex: 1
  }

  componentDidMount = async () => {
    await this.updateKudos()
    this.getNextKudoInterval = setInterval(this.updateDisplayedIndex, 1000)
    this.getKudosInterval = setInterval(this.updateKudos, 1000)
  }

  componentWillUnmount = () => {
    clearInterval(this.getNextKudoInterval)
    clearInterval(this.getKudosInterval)
  }

  updateDisplayedIndex = () => {
    const kudosLength = this.state.kudos.length
    if (kudosLength === 0) {
      return
    }
    const { displayedIndex } = this.state
    const nextDisplayedIndex = (displayedIndex + 1) % kudosLength
    this.setState({ displayedIndex: nextDisplayedIndex })
  }

  updateKudos = async () => {
    try {
      const results = await get(URL)
      this.setState({
        kudos: results.data._embedded.kudo,
      })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { displayedIndex, kudos } = this.state
    return (
      <div id="kudos">
        <div>
          <TitleBar
            displayedIndex={displayedIndex + 1}
            total={kudos.length}
          />
          <br />
          {this.renderKudo()}
        </div>
      </div>
    )
  }

  renderKudo = () => {
    const { displayedIndex, kudos } = this.state
    if (kudos.length === 0) return "There are currently no kudos 😿"

    return <Kudo {...kudos[displayedIndex]} />
  }
}

export default KudosContainer
