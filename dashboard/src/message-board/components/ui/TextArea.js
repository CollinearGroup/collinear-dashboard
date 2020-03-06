import React from 'react';

const TextArea = (props) => {
    return <textarea className="input-box" rows="4" type="text" name={props.name} placeholder={props.placeholder} onChange={props.change} />
}

export default TextArea;