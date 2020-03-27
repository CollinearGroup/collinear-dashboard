import React, { Component } from "react"
import "./MessageBoard.css"
import MessageBoard from "./containers/MessageBoard"
import MessageBoardForm from "./containers/MessageBoardForm"
import Button from "./components/ui/Button"

class App extends Component {
  state = {
    editMode: false,
    showEditButton: false
  }
  toggleModeHandler = () => {
    this.setState({ editMode: !this.state.editMode })
  }
  showEditButton = () => {
    this.setState({ showEditButton: true })
  }
  hideEditButton = () => {
    this.setState({ showEditButton: false })
  }

  render() {
    if (this.state.editMode) {
      return (
        <div className="message-board">
          <MessageBoardForm switchMode={this.toggleModeHandler} />
        </div>
      )
    }
    return (
      <div
        style={{ height: "100%" }}
        onMouseEnter={this.showEditButton}
        onMouseLeave={this.hideEditButton}
        className="message-board"
      >
        <div className="title">Announcements</div>
        <br />
        <MessageBoard switchMode={this.toggleModeHandler} />
        <br />
        {this.renderEditFormButton()}
      </div>
    )
  }

  renderEditFormButton = () => {
    if (this.state.showEditButton) {
      return (
        <div style={{ textAlign: "center" }}>
          <Button
            clickHandler={this.toggleModeHandler}
            text="Enter a new message"
          />
        </div>
      )
    }
  }
}

export default App
