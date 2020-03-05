import React from 'react';

const InputBox = (props) => {
    return <input className="input-box" type="text" name={props.name} placeholder={props.placeholder} onChange={props.change} />
}

export default InputBox