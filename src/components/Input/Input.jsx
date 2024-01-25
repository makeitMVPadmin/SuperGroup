import "./Input.scss";
import React, { useState } from "react";
import { db } from "../../firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/clerk-react";
import paper from "../../assets/icons/paper.svg"
import mountain from "../../assets/icons/mountain.jpg"
import rectangleSend from "../../assets/icons/rectangleSend.svg"
import send from "../../assets/icons/send.svg"
const Input = ({ chatId }) => {
  const [messageText, setMessageText] = useState(""); //Keeps track of the input field value for the message text.
  const [aiResponse, setAiResponse] = useState("");
  const { user } = useUser();
  const uid = user.id;//Retrieve the logged-in user's ID
  const uuid = uuidv4();
  console.log(user)
  console.log(user.imageUrl);

  //function triggered wheb users clicks send button
  const handleSendMessage = async () => {
    if (messageText.trim() === "") {
      return; // Don't send empty messages
    }

    const message = {
      id: uuid, // Generate a UUID for the message
      text: messageText,
      senderId: uid,
      timestamp: new Date().toISOString(), // Current timestamp
      name: user.fullName,
      aiResponse: aiResponse,
    };


    try {
      // Create a new message document in the chatRoom's 'messages' subcollection
      const messagesCollection = collection(db, `chatRooms/${chatId}/messages`);
      await addDoc(messagesCollection, message);

      // Clear the input field after sending the message
      setMessageText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="input">
      <input
        className="input__field"
        type="text"
        placeholder="Type something..."
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
      />
      {/* <img className="input__field-img" scr={mountain} /> */}
      <button className="input__btn"><img className="input__img" src={paper} /></button>
      {/* <div className="input__send"> */}
      <img className="input__send" src={send} onClick={handleSendMessage} />
      {/* </div> */}
    </div>
  );
};

export default Input;

