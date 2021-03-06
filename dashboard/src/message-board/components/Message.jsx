import React from "react";
import "./Message.css";
import moment from "moment";

const Message = props => {
  return (
    <div className="message-container">
      <div className="poster">{props.poster_name}</div>
      <div className="message-date">
        {moment(props.show_from).format("MMMM Do, YYYY")}
      </div>
      <br></br>
      <p className="message">{props.message}</p>
    </div>
  );
};

export default Message;
