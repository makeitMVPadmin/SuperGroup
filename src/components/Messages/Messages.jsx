import React, { useEffect, useState } from "react";
import Message from "../Message/Message";
import "./Messages.scss";
import { onSnapshot, collection, orderBy, query, doc } from "firebase/firestore";
import { db } from "../../firebase-config";

const Messages = ({ uid, chatId }) => {
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    // Create a reference to the messages collection for the chat room
    const chatRoomRef = doc(db, "chatRooms", chatId); // Updated collection reference to "chatRooms"

    // Create a reference to the messages subcollection within the chat room
    const messagesCollection = collection(chatRoomRef, "messages");

    // Create a query to order messages by timestamp
    const messagesQuery = query(messagesCollection, orderBy("timestamp"));
    
    // Subscribe to changes in the messages collection
    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messageData = [];
      snapshot.forEach((doc) => {
        const message = doc.data();
        // Format the timestamp to a string (e.g., using toLocaleString())
        const formattedTimestamp = new Date(message.timestamp.seconds * 1000).toLocaleString();
        console.log(formattedTimestamp)
        messageData.push({
          id: doc.id,
          ...message,
          timestamp: formattedTimestamp, // Updated timestamp to a formatted string
        });
      });
      setMessages(messageData);
    });

    // Clean up the subscription when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [chatId]);

  return (
    <div className="messages">
      {messages.map((message) => (
        <Message key={message.id} message={message} uid={uid}/>
      ))}
    </div>
  );
};

export default Messages;



