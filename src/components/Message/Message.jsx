import React, { useEffect, useRef } from "react";
import "./Message.scss";
import { useUser } from "@clerk/clerk-react";

const Message = ({ message, uid }) => {
  const { text, senderId, createdAt } = message;
  const user = useUser()
  const isCurrentUser = senderId === uid;
  
  const ref = useRef();

  useEffect(()=>{
    ref.current?.scrollIntoView({behavior:"smooth"})
  },[message])

  return (
    <div ref={ref} className={`message ${isCurrentUser ? "owner" : "other-user"}`}>
      <div className="message__info">
        {/* Profile picture */}
        <div className="placeholder"></div>
        {/* Timestamp */}
        <span>{createdAt}</span>
      </div>
      <div className="message__content">
        <p className="message__content-text">{text}</p>
      </div>
    </div>
  );
};

export default Message;
