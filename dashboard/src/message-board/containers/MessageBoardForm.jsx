import React, { Component } from 'react';
import './MessageBoardForm.css';
import axios from 'axios';
import Button from '../components/ui/Button';
import InputBox from '../components/ui/InputBox';
import TextArea from '../components/ui/TextArea';
import DatePicker from '../components/ui/DatePicker';

const messageBoardURL = process.env.MESSAGE_BOARD_API_URL || "http://localhost:8011/api/messages/";

class MessageBoardForm extends Component {

    state = {
        poster_name: '',
        message: '',
        show_from: '',
        show_to: '',
        canSubmit: false
    }

    onInputChangeHandler = (event) => {
        this.setState(
            {
                [event.target.name]: event.target.value
            }, 
            function() { 
                if (this.state.poster_name !== '' && this.state.message !== '' 
                   && this.state.show_from !== '' && this.state.show_to !== '') {
                       this.setState(
                           {
                               canSubmit: true
                           }
                       )
                }
                else if (this.state.canSubmit) {
                    this.setState(
                        {
                            canSubmit: false
                        }
                    )
                }
            })
    }

    messagePostHandler = (event) => {
        event.preventDefault();
        const { poster_name, message, show_from, show_to } = this.state
        const newMessage = {
            poster_name,
            message,
            show_from,
            show_to
        }
        axios.post(messageBoardURL, newMessage)
             .then(response => {
                     console.log('Response was ' + response)
                     this.props.switchMode()
                 })
             .catch(error => console.log('Error was ' + error));
    }

    render() {
        return (
            <div className="input-form">
              <Button clickHandler={this.props.switchMode} text="Back to Messages" />
              <form>
                <p>Enter a new message</p>
                <div>
                    <InputBox name='poster_name' placeholder="Enter Name" change={this.onInputChangeHandler}/>
                </div>
                <div>
                    <TextArea name='message' placeholder='Enter Message Here' change={this.onInputChangeHandler} />
                </div>
                <div>
                    <DatePicker label='Effective Date' name='show_from' change={this.onInputChangeHandler} />
                </div>
                <div>
                    <DatePicker label='ExpirationDate' name='show_to' change={this.onInputChangeHandler} />
                </div>
                <Button disabled={!this.state.canSubmit} clickHandler={this.messagePostHandler} text="SUBMIT MESSAGE" /> 
              </form>
            </div>
        )
    }
}

export default MessageBoardForm;