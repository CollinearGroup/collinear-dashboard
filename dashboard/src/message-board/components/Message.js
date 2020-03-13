import React from 'react'
import './Message.css'

const Message = (props) => {
    return (
        <div className='message-container'>
            <div className='message'>{props.message}</div>
            <div className='poster'>Posted by: {props.poster_name}</div>
        </div>
    )
}

export default Message