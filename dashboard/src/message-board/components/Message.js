import React from 'react'
import './Message.css'

const Message = (props) => {
    return (
        <div className='message'>
            <div className='time-period'>{props.timePeriod}</div>
            <div className='title'>{props.title}</div>
            <div className='description'>{props.description}</div>
        </div>
    )
}

export default Message