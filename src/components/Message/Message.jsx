import React, { useEffect, useRef } from "react";
import "./Message.scss";
import { useUser } from "@clerk/clerk-react";

const Message = ({ message, uid }) => {
  const { text, name, senderId, timestamp, aiResponse } = message;
  const user = useUser()
  const isCurrentUser = senderId === uid; // Check if the message is from the current user
  console.log(uid)
  console.log(timestamp)

  const ref = useRef(); // Ref for scrolling to the last message

  // Effect to scroll into view when a new message is rendered
  useEffect(()=>{
    ref.current?.scrollIntoView({behavior:"smooth"})
  },[message])

  return (
    <div ref={ref} className={`message ${isCurrentUser ? "owner" : "other-user"}`}>
      {console.log(isCurrentUser)}
      <div className="message__info">
        {/* Profile picture */}
        <div className="placeholder"></div>
      <div className="message__content">
        <p className="message__content-text">{text}</p>
        <div>
          <span className="message__name">{name}</span>
          <span className="message__time">{timestamp}</span>
        </div>
        <p>{aiResponse}</p>
      </div>
      </div>
    </div>
  );
};

export default Message;
