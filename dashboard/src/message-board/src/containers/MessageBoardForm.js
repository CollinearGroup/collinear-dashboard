import React, { Component } from 'react';
import './MessageBoardForm.css';
import axios from 'axios';
import Button from '../components/ui/Button';
import InputBox from '../components/ui/InputBox';
import TextArea from '../components/ui/TextArea';
import DatePicker from '../components/ui/DatePicker';

class MessageBoardForm extends Component {

    state = {
        title: '',
        description: '',
        timePeriod: '',
        effectiveDate: '',
        expirationDate: '',
        canSubmit: false
    }

    onInputChangeHandler = (event) => {
        this.setState(
            {
                [event.target.name]: event.target.value
            }, 
            function() { 
                if (this.state.title !== '' && this.state.description !== '' && this.state.timePeriod !== '' 
                   && this.state.effectiveDate !== '' && this.state.expirationDate !== '') {
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
        const message = {
            title: this.state.title,
            description: this.state.description,
            timePeriod: this.state.timePeriod,
            effectiveDate: this.state.effectiveDate,
            expirationDate: this.state.expirationDate
        }
        axios.post('https://cd-message-board.firebaseio.com/messages.json', message)
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
                    <InputBox name='title' placeholder='Title' change={this.onInputChangeHandler}/>
                </div>
                <div>
                    <TextArea name='description' placeholder='Message Description' change={this.onInputChangeHandler} />
                </div>
                <div>
                    <InputBox name='timePeriod' placeholder='Time period (example: "Week of May 9")' change={this.onInputChangeHandler} />
                </div>
                <div>
                    <DatePicker label='Effective Date' name='effectiveDate' change={this.onInputChangeHandler} />
                </div>
                <div>
                    <DatePicker label='ExpirationDate' name='expirationDate' change={this.onInputChangeHandler} />
                </div>
                <Button disabled={!this.state.canSubmit} clickHandler={this.messagePostHandler} text="SUBMIT MESSAGE" /> 
              </form>
            </div>
        )
    }
}

export default MessageBoardForm;