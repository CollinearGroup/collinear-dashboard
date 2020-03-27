import React, { Component } from "react"
import axios from "axios"
import Message from "../components/Message"

const messageBoardURL =
  process.env.REACT_APP_MESSAGE_BOARD_API_URL ||
  "http://localhost:8011/api/messages/"

const MESSAGE_RANGE_TO_DISPLAY = 2

class MessageBoard extends Component {
  state = {
    messages: [],
    messagesIndexToDisplay: 0
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
    let { messagesIndexToDisplay } = this.state
    const nextMessageIndex = ++messagesIndexToDisplay % totalMessages
    this.setState({ messagesIndexToDisplay: nextMessageIndex })
  }

  startRefreshDataInterval = () => {
    this.refreshInterval = setInterval(this.updateStateWithMessages, 10000)
  }

  render() {
    const messagesToDisplay = this.messagesToDisplay()
    return <div>{this.renderMessages(messagesToDisplay)}</div>
  }

  messagesToDisplay = () => {
    const { messages, messagesIndexToDisplay } = this.state
    const messagesToDisplay = []
    const numberOfMessagesThatCanBeDisplayed =
      messages.length < MESSAGE_RANGE_TO_DISPLAY
        ? messages.length
        : MESSAGE_RANGE_TO_DISPLAY
    for (let index = 0; index < numberOfMessagesThatCanBeDisplayed; index++) {
      const messagesIndex = (messagesIndexToDisplay + index) % messages.length
      messagesToDisplay.unshift(messages[messagesIndex])
    }
    return messagesToDisplay
  }

  renderMessages = messages => {
    return messages.map(message => {
      return (
        <Message
          poster_name={message.poster_name}
          message={message.message}
          show_from={message.show_from}
        />
      )
    })
  }
}

export default MessageBoard
