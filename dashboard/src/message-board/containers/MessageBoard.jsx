import React, { Component } from 'react'
import Button from '../components/ui/Button'
import axios from 'axios';
import Message from '../components/Message'

const messageBoardURL = process.env.MESSAGE_BOARD_API_URL || "http://localhost:8011/api/messages/";

class MessageBoard extends Component {

    state = {
        messages: [],
        messageNumberToDisplay: 0,
    }
    
    messageJsxToDisplay = null

    async componentDidMount() {
        await axios.get(messageBoardURL)
            .then(response => {
                const messages = response.data.messages
                const todaysDate = new Date().toISOString()
                const filteredMessages = Object.values(messages).filter(message => {
                    return message.show_to >= todaysDate && message.show_from <= todaysDate
                })
                this.setState( { messages: filteredMessages } )
            })
        .catch(error => console.log('Error was ' + error))
        const totalMessages = this.state.messages.length
        if (totalMessages > 0) {
            const messageToDisplay = this.state.messages[this.state.messageNumberToDisplay]
            this.setState({
                messageJsxToDisplay: (<div>
                    <Message 
                        poster_name={messageToDisplay.poster_name} 
                        message={messageToDisplay.message} />
                    </div>
                )
            })
                
            this.rotateFocus(totalMessages)
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    incrementMessage(totalMessages, messageNumberToDisplay) {
        if (messageNumberToDisplay === totalMessages - 1 ) {
            this.setState( { messageNumberToDisplay: 0} )
        }
        else {
            this.setState( { messageNumberToDisplay: messageNumberToDisplay + 1 } )
        }
    }

    rotateFocus(totalMessages) {
        if (totalMessages > 1) {
            this.interval = setInterval(() => this.incrementMessage(totalMessages, this.state.messageNumberToDisplay), 5000)
        }
    }

    render() {

        return (
            <div>
                <Button clickHandler={this.props.switchMode} text="Add an event" />
                {this.messageJsxToDisplay}
            </div>
        )
    }
}

export default MessageBoard;