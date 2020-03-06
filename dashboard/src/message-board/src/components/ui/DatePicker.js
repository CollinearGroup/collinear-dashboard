import React from 'react';

const DatePicker = (props) => {
    return (
        <div className="input-box">
            {props.label} 
            <input name={props.name} className="date-picker" type="date" onChange={props.change}>
            </input>
        </div>
    ) 
}

export default DatePicker; 