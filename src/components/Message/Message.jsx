import React, { useEffect, useRef, useState } from "react";
import "./Message.scss";
import { UserProfile, useUser } from "@clerk/clerk-react";
import { db } from '../../firebase-config';
import down from "../../assets/icons/down-unselected.svg";
import up from "../../assets/icons/up-unselected.svg";
import downSelected from "../../assets/icons/down-selected.svg";
import upSelected from "../../assets/icons/up-selected.svg";


const Message = ({ message, uid, chatId }) => {
  const { text, name, senderId, timestamp, aiResponse } = message;
  const user = useUser()
  const isCurrentUser = senderId === uid; // Check if the message is from the current user
  const [thumbsUpSelected, setThumbsUpSelected] = useState(false);
  const [thumbsDownSelected, setThumbsDownSelected] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalInput, setModalInput] = useState('');
  console.log(user)

  console.log(uid)
  console.log(timestamp)
  // const date = new Date(timestamp);

  // console.log('Message ID:', messageId);
  console.log('Chat ID:', chatId);

  // Convert the date to the desired time format
  // const formattedTime = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  const date = new Date(timestamp);
  const formattedTimestamp = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

  const containsAIMention = text.toLowerCase().includes('@ai');

  const ref = useRef(); // Ref for scrolling to the last message

  // Effect to scroll into view when a new message is rendered
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }, [message])

  const [thumbsUpStatus, setThumbsUpStatus] = useState({});
  const [thumbsDownStatus, setThumbsDownStatus] = useState({});

  // Effect to initialize thumbs-up status for each message
  useEffect(() => {
    setThumbsUpStatus((prevStatus) => ({
      ...prevStatus,
      [message.id]: false // Initialize thumbs-up status for the specific message ID
    }));
    setThumbsDownStatus((prevStatus) => ({
      ...prevStatus,
      [message.id]: false // Initialize thumbs-down status for the specific message ID
    }));
  }, [message.id]);

  const handleThumbsDown = () => {
    if (!thumbsDownStatus[message.id]) {
      setThumbsDownStatus((prevStatus) => ({
        ...prevStatus,
        [message.id]: true // Set thumbs-down status for the specific message ID
      }));
      setThumbsUpStatus((prevStatus) => ({
        ...prevStatus,
        [message.id]: false // Deselect thumbs-up for the same message ID
      }));

      // Set thumbs-down image to downSelected after modal is closed
      const thumbsDownImage = document.querySelector(`#thumbs-down-${message.id}`);
      if (thumbsDownImage) {
        thumbsDownImage.src = downSelected;
      }
      setShowModal(true);
    } else {
      setThumbsDownStatus((prevStatus) => ({
        ...prevStatus,
        [message.id]: false // Deselect thumbs-down for the specific message ID
      }));
      setShowModal(false);
    }

  };
  const handleThumbsUp = () => {
    setThumbsUpStatus((prevStatus) => ({
      ...prevStatus,
      [message.id]: !prevStatus[message.id] // Toggle the thumbs-up status for the specific message ID
    }));
    setThumbsDownStatus((prevStatus) => ({
      ...prevStatus,
      [message.id]: false // Set thumbs-down status for the specific message ID
    }));
  };

  // Function to highlight @ai in the message
  const highlightAIMention = (messageText) => {
    return messageText.replace(/(@ai)/gi, '<span class="highlighted">$1</span>');
  };

  const handleModalInputChange = (event) => {
    setModalInput(event.target.value);
  };

  const sendMessage = () => {
    console.log("Improvement suggestion:", modalInput);

    // Additional logic (send data to server, update state, etc.)

    // Reset modal state and input
    setShowModal(false);
    setModalInput('');

  };
  const closeModal = () => {
    setModalInput('');
    setShowModal(false);
  }


  return (

    <div ref={ref} className={`message ${isCurrentUser ? "owner" : "other-user"}`}>
      {console.log(isCurrentUser)}
      {isCurrentUser ? (
        <div className="message__info">
          {/* Profile picture */}
          {/* <img src={user.imageUrl} className="message__profile" alt="profile picture of user" /> */}
          <div className="message__profile--owner"></div>
          <div className="message__content">
            <p className="message__content-text" dangerouslySetInnerHTML={{ __html: highlightAIMention(text) }}></p>
            <div className={`message__content-user`}>
              <span className="message__content-name">{name}</span>
              <span className="message__content-time">{formattedTimestamp}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="message__info--other">
          <div className="message__content">
            <p className="message__content-text message__content-text--other" dangerouslySetInnerHTML={{ __html: highlightAIMention(text) }}></p>
            <div className={`message__content-user`}>
              <span className="message__content-name">{name}</span>
              <span className="message__content-time">{formattedTimestamp}</span>
            </div>
          </div>
          {/* Profile picture */}
          <div className="message__profile"></div>
        </div>
      )}
      {containsAIMention && (
        <div className="message__ai-total">
          <div className="message__ai">
            <p id="message__ai-response" className="message__ai-response">{aiResponse}</p>
            <div className="message__content-user">
              <span className="message__content-name">AI</span>
              <span className="message__content-time">{formattedTimestamp}</span>
            </div>
            <div className="message__feedback-container">
              <span className="message__feedback">Was this helpful?</span>
              <div className="message__feedback-icons">
                <img className="message__thumbs-up" src={thumbsUpStatus[message.id] ? upSelected : up} alt="Thumbs up icon" onClick={handleThumbsUp} />
                <img className="message__thumbs-down" src={thumbsDownStatus[message.id] ? downSelected : down} alt="Thumbs down icon" onClick={handleThumbsDown} />
              </div>
            </div>
          </div>
          <div className="message__ai-profile"></div>
        </div>
      )}
      {/* Modal */}
      {showModal && (
        <div className="message__modal-overlay">
          <div className="message__modal">
            <div className="message__modal-container">
              <button id="message__modal-exit" onClick={closeModal}>X</button></div>
            <p>Please describe how I can improve:</p>
            <textarea value={modalInput} onChange={handleModalInputChange} />
            <div className="message__modal-container">
              <button onClick={sendMessage}>Submit Feedback</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
