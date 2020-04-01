import React, { Component } from "react"
import { get } from "axios"
import "./kudos.css"
import TitleBar from "./TitleBar"
import Kudo from "./Kudo"
import img from "./kudos.png"

// TODO
const URL = "http://localhost:8080/kudo"

class KudosContainer extends Component {
  state = {
    kudos: [],
    displayedIndex: 1,
    showEditButton: false,
    editMode: false,
    kudoFormMessage: "",
    kudoFormFrom: "",
    kudoFormPassword: ""
  }

  showEditButton = () => {
    this.setState({ showEditButton: true })
  }
  hideEditButton = () => {
    this.setState({ showEditButton: false })
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
        kudos: results.data._embedded.kudo
      })
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
    return this.renderKudoForm()
  }

  renderKudo = () => {
    const { displayedIndex, kudos } = this.state
    if (kudos.length === 0) return "There are currently no kudos 😿"

    return <Kudo {...kudos[displayedIndex]} />
  }

  renderAddKudosButton = () => {
    const { showEditButton, editMode } = this.state
    const setEditModeToTrue = () => {
      this.setState({ editMode: true })
    }
    const setEditModeToFalse = () => {
      this.setState({ editMode: false })
    }
    const saveData = () => {
      console.log("save")
    }
    if (!showEditButton) return ""
    if (!editMode) {
      return <button onClick={setEditModeToTrue}>Add Kudo</button>
    }
    return (
      <div>
        <button onClick={setEditModeToFalse}>Cancel</button>
        <button onClick={saveData}>Save</button>
      </div>
    )
  }

  renderKudoForm = () => {
    return (
      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <textarea style={{width: "60%"}} rows="5" name="" id="" placeholder="Kudos text"></textarea>
        <br/>
        <input type="text" placeholder="From" />
        <br/>
        <input type="password" placeholder="Password" />
      </div>
    )
  }
}

export default KudosContainer
