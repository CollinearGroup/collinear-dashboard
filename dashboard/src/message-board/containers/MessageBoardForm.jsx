import React, { Component } from "react"
import "./MessageBoardForm.css"
import axios from "axios"
import crypto from "crypto"
import Button from "../components/ui/Button"
import InputBox from "../components/ui/InputBox"
import TextArea from "../components/ui/TextArea"
import DatePicker from "../components/ui/DatePicker"
import PasswordBox from "../components/ui/PasswordBox"

const messageBoardURL =
  process.env.REACT_APP_MESSAGE_BOARD_API_URL ||
  "http://localhost:8011/api/messages/"

class MessageBoardForm extends Component {
  state = {
    poster_name: "",
    message: "",
    show_from: "",
    show_to: "",
    passcode: "",
    canSubmit: false
  }

  onInputChangeHandler = event => {
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      function() {
        if (
          this.state.poster_name !== "" &&
          this.state.message !== "" &&
          this.state.passcode !== "" &&
          this.state.show_from !== "" &&
          this.state.show_to !== ""
        ) {
          this.setState({
            canSubmit: true
          })
        } else if (this.state.canSubmit) {
          this.setState({
            canSubmit: false
          })
        }
      }
    )
  }

  messagePostHandler = () => {
    const { poster_name, message, show_from, show_to, passcode } = this.state
    const newMessage = {
      from: poster_name,
      text: message,
      show_from,
      show_to
    }

    const secretBuffer = Buffer.from(passcode, "base64")

    const payload = JSON.stringify(newMessage)
    const payloadBuffer = Buffer.from(payload, "utf8")

    // Create HMAC hash
    const hash = crypto.createHmac("sha256", secretBuffer).update(payloadBuffer)
    const digest64 = hash.digest("base64")
    const hmacAuth = `HMAC ${digest64}`

    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: hmacAuth
      }
    }

    axios
      .post(messageBoardURL, newMessage, options)
      .then(() => {
        this.props.switchMode()
      })
      .catch(error => console.log("Error was " + error))
  }

  render() {
    return (
      <div className="input-form">
        <Button clickHandler={this.props.switchMode} text="Back to Messages" />
        <p>Enter a new message</p>
        <div>
          <InputBox
            name="poster_name"
            placeholder="Enter Name"
            change={this.onInputChangeHandler}
          />
        </div>
        <div>
          <TextArea
            name="message"
            placeholder="Enter Message Here"
            change={this.onInputChangeHandler}
          />
        </div>
        <div>
          <PasswordBox
            name="passcode"
            placeholder="Enter Passcode"
            change={this.onInputChangeHandler}
          />
        </div>
        <div>
          <DatePicker
            label="Effective Date"
            name="show_from"
            change={this.onInputChangeHandler}
          />
        </div>
        <div>
          <DatePicker
            label="ExpirationDate"
            name="show_to"
            change={this.onInputChangeHandler}
          />
        </div>
        <Button
          disabled={!this.state.canSubmit}
          clickHandler={this.messagePostHandler}
          text="SUBMIT MESSAGE"
        />
      </div>
    )
  }
}

export default MessageBoardForm
