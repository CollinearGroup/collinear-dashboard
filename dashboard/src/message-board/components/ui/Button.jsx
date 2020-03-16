import React from 'react';

const Button = (props) => {
    return <button type="submit" disabled={props.disabled} onClick={props.clickHandler}>{props.text}</button>
}

export default Button;