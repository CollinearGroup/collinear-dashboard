import React, { Component } from "react"
import axios from "axios"
import Message from "../components/Message"

const messageBoardURL =
  process.env.REACT_APP_MESSAGE_BOARD_API_URL || "http://localhost:8011/api/messages/"

class MessageBoard extends Component {
  state = {
    messages: [],
    messageNumberToDisplay: 0
  }

  componentDidMount = async () => {
    await this.updateStateWithMessages()
    this.rotateFocus()
    this.startRefreshDataInterval()
  }

  updateStateWithMessages = async () => {
    const messages = await this.fetchMessages()
    const filteredMessages = this.filterMessagesByTodaysDate(messages)
    this.setState({ messages: filteredMessages })
  }

  componentWillUnmount() {
    clearInterval(this.interval)
    clearInterval(this.refreshInterval)
  }

  fetchMessages = async () => {
    try {
      const response = await axios.get(messageBoardURL)
      return response.data.messages
    } catch (error) {
      console.log(error)
      return []
    }
  }

  filterMessagesByTodaysDate = messages => {
    const todaysDate = Date.now()
    const messagesInDateRange = messages.filter(message => {
      return this.isDateInMessageRange(todaysDate, message)
    })
    return messagesInDateRange
  }

  isDateInMessageRange = (date, message) => {
    const { show_to, show_from } = message
    const show_to_time = new Date(show_to).getTime()
    const show_from_time = new Date(show_from).getTime()
    return show_to_time >= date && show_from_time <= date
  }

  rotateFocus = () => {
    this.interval = setInterval(this.incrementMessage, 10000)
  }

  incrementMessage = () => {
    const totalMessages = this.state.messages.length
    if (totalMessages === 0) {
      return
    }
    let { messageNumberToDisplay } = this.state
    const nextMessageIndex = ++messageNumberToDisplay % totalMessages
    this.setState({ messageNumberToDisplay: nextMessageIndex })
  }

  startRefreshDataInterval = () => {
    this.refreshInterval = setInterval(this.updateStateWithMessages, 10000)
  }

  render() {
    return (
      <div>
        {this.state.messages[this.state.messageNumberToDisplay] ? (
          <Message
            poster_name={
              this.state.messages[this.state.messageNumberToDisplay].poster_name
            }
            message={
              this.state.messages[this.state.messageNumberToDisplay].message
            }
            show_from={
              this.state.messages[this.state.messageNumberToDisplay].show_from
            }
          />
        ) : (
          ""
        )}
      </div>
    )
  }
}

export default MessageBoard
