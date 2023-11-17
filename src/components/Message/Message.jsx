import "./Message.scss"
import { useUser } from "@clerk/clerk-react";

const Message = ({ message }) => {
  const { user } = useUser();
  const { text, senderId, timestamp } = message;
  return (
    <div className={`message ${senderId === user.uid && "owner"}`}>
        <div className="message__info">
            {/* profile picture */}
            <div className="placeholder"></div>
            {/* time stamp */}
            <span>{timestamp}</span>
        </div>
        <div className="message__content">
            <p className="message__content-text">{text}</p>
        </div>
    </div>
  )
}

export default Message;