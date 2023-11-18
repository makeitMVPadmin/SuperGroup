
import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, updateDoc, doc  } from 'firebase/firestore';
import { app, db } from '../../firebase-config'; // Import your Firebase app instance and Firestore
import down from "../../assets/icons/thumbsDown.svg";
import up from "../../assets/icons/thumbsUp.svg";

const ChatC = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [modalInput, setModalInput] = useState(''); 
//   const [showImproveDiv, setShowImproveDiv] = useState(false); 
  const [showImproveDiv, setShowImproveDiv] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'messages-t'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    // Check if the new message contains "@ai"
    const containsAIMention = newMessage.toLowerCase().includes('@ai');
    await addDoc(collection(db, 'messages-t'), {
      text: newMessage,
      timestamp: serverTimestamp(),
      containsAIMention: containsAIMention,
    });

    setNewMessage('');
  };

  const handleThumbsUp = async (messageId, thumbsUpStatus) => {
    console.log(messageId)
    try {
      const messageRef = doc(db, 'messages-t', messageId);
      await updateDoc(messageRef, {
        thumbsUp: !thumbsUpStatus, // Toggle thumbsUp status for the specific message
      });
    } catch (error) {
      console.error('Error updating thumbs up:', error);
    }
  };
  const handleThumbsDown = async (messageId, nextMessageContent) => {
    setShowImproveDiv({ ...showImproveDiv, [messageId]: true });
    console.log(messageId)
    setShowModal(true); 
    try {
      const messageRef = doc(db, 'messages-t', messageId);
      // Update the document for the thumbs-downed message with thumbsDown: true
      await updateDoc(messageRef, {
        thumbsDown: true,
      });
      // Create a new document with the content of the next message
      await addDoc(collection(db, 'messages-t'), {
        text: nextMessageContent,
        timestamp: serverTimestamp(),
        parentMessageId: messageId, // Save the ID of the thumbs-downed message
        containsAIMention: nextMessageContent.toLowerCase().includes('@ai'), // Check if the next message contains '@ai'
      });
    } catch (error) {
      console.error('Error updating thumbs down:', error);
    }
  };
  
 
  const closeModal = () => {
    setShowModal(false); // Function to close the modal
    setModalInput(''); // Clear the modal's textarea input when closing the modal
  };

  const handleModalInputChange = (e) => {
    setModalInput(e.target.value); // Update the modal's textarea input
  };
  return (
    <div>
      <div>
        {messages.map((message) => (
          <div key={message.id}>
            <p >{message.text}</p>
            {message.containsAIMention && (
            <div className="test__ai-message">
              <p className="test__message">{message.aiResponse}</p>
              <div className="test__feedback">
                <span className="test__span">Was this helpful?</span>
                <div className="test__feedback-icons">
                    <img className="test__img1" src={up} alt="Thumbs up"  onClick={() => handleThumbsUp(message.id, message.thumbsUp)}/>
                    <img className="test__img2" src={down} alt="Thumbs down" onClick={() => handleThumbsDown(message.id)}/>
                </div>
                </div>
                {/* Conditional rendering for the "improve" div */}
                {showImproveDiv[message.id] && (
                    <div className="test__improve-container">
                      <p className="test__message">Please describe how I can improve</p>
                      <div className="test__ai-img"></div>
                    </div>
                  )}
              </div>
            )}
          </div>
        ))}
         {/* Modal component */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <p>Please describe how I can improve:</p>
            <textarea value={modalInput} onChange={handleModalInputChange} />
            <button onClick={sendMessage}>Submit</button>
          </div>
        </div>
      )}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatC;