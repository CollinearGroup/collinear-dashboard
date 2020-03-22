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
        <div className="App">
          <MessageBoardForm switchMode={this.toggleModeHandler} />
        </div>
      )
    }
    return (
      <div
        style={{ height: "100%" }}
        onMouseEnter={this.showEditButton}
        onMouseLeave={this.hideEditButton}
        className="App"
      >
        <div>Messages</div>
        <MessageBoard switchMode={this.toggleModeHandler} />
        {this.renderEditFormButton()}
      </div>
    )
  }

  renderEditFormButton = () => {
    if (this.state.showEditButton) {
      return (
        <Button
          clickHandler={this.toggleModeHandler}
          text="Enter a new message"
        />
      )
    }
  }
}

export default App
