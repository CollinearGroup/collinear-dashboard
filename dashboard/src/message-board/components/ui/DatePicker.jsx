import React from 'react';
import '../../containers/MessageBoardForm.css'

const DatePicker = (props) => {
    return (
        <div className="input-box">
            <div>{props.label}</div>
            <div>
                <input name={props.name} className="date-picker" type="date" onChange={props.change} />
            </div>
        </div>
    ) 
}

export default DatePicker; 