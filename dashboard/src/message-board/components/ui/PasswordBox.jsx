import React from 'react';

const PasswordBox = (props) => {
    return <input className="input-box" type="password" name={props.name} placeholder={props.placeholder} onChange={props.change} />
}

export default PasswordBox