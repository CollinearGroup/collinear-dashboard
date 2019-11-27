import React, { Component } from 'react';
import Button from '../components/ui/Button'
import axios from 'axios';
import Message from '../components/Message'

class MessageBoard extends Component {

    state = {
        messages: []
    }

    componentDidMount() {
        axios.get('https://cd-message-board.firebaseio.com/messages.json')
            .then(response => {
                const keys = Object.keys(response.data);
                const messages = keys.map((key) => response.data[key])
                let counter = 0;
                const keyedMessages = messages.map((message) => {
                    message.key = counter
                    counter++
                    return message
                })
                const todaysDate = new Date().toISOString()
                const filteredMessages = keyedMessages.filter((message) => 
                    message.expirationDate >= todaysDate && message.effectiveDate <= todaysDate
                )
                console.log(filteredMessages)
                this.setState( { messages: filteredMessages } )
            })
            .catch(error => console.log('Error was ' + error))
    }

    render() {
        const messagesToDisplay = this.state.messages.map((message) => 
            <div key={message.key}>
               <Message 
                 title={message.title} 
                 description={message.description} 
                 timePeriod={message.timePeriod} />
            </div>
        );

        return (
            <div>
                <Button clickHandler={this.props.switchMode} text="Add an event" />
                {messagesToDisplay}
            </div>
        )
    }
}

export default MessageBoard;