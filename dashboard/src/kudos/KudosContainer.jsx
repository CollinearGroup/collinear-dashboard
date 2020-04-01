import React, { Component } from "react"
import { get } from "axios"
import "./kudos.css"
import TitleBar from "./views/TitleBar"
import Kudo from "./views/Kudo"
import img from "./kudos.png"
import AddForm from "./AddForm"
import { save, getAll } from "./KudoService"

class KudosContainer extends Component {
  state = {
    kudos: [],
    displayedIndex: 1,
    showEditButton: false,
    editMode: false
  }

  showEditButton = () => {
    this.setState({ showEditButton: true })
  }
  hideEditButton = () => {
    this.setState({ showEditButton: false })
  }

  saveHandler = (kudo, password) => {
    save(kudo, password)
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
      this.setState({ kudos: await getAll() })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { displayedIndex, kudos } = this.state
    return (
      <div
        id="kudos-container"
        onMouseEnter={this.showEditButton}
        onMouseLeave={this.hideEditButton}
      >
        <div id="background">
          <img src={img} alt="" />
        </div>
        <div id="kudos-content">
          <TitleBar displayedIndex={displayedIndex + 1} total={kudos.length} />
          <br />
          {this.renderKudoOrForm()}
        </div>
        <div id="form-button-container">{this.renderAddKudosButton()}</div>
      </div>
    )
  }

  renderKudoOrForm = () => {
    const { editMode } = this.state
    if (!editMode) return this.renderKudo()

    return <AddForm onSave={this.saveHandler} />
  }

  renderKudo = () => {
    const { displayedIndex, kudos } = this.state
    if (kudos.length === 0) return "There are currently no kudos 😿"

    return <Kudo {...kudos[displayedIndex]} />
  }

  renderAddKudosButton = () => {
    const { showEditButton, editMode } = this.state
    if (!showEditButton) return ""
    if (!editMode) {
      return <button onClick={this.setEditModeToTrue}>Add Kudo</button>
    }
    return <button onClick={this.setEditModeToFalse}>Cancel</button>
  }

  setEditModeToTrue = () => {
    this.setState({ editMode: true })
  }
  setEditModeToFalse = () => {
    this.setState({ editMode: false })
  }
}

export default KudosContainer
