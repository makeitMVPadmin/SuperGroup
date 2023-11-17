import React, { useEffect, useState } from "react";
import Message from "../Message/Message";
import "./Messages.scss";
import { onSnapshot, collection, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase-config";

const Messages = ({ chatId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Create a reference to the messages collection for the chat
    const messagesCollection = collection(db, `chats/${chatId}/messages`);

    // Create a query to order messages by timestamp
    const messagesQuery = query(messagesCollection, orderBy("timestamp"));

    // Subscribe to changes in the messages collection
    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messageData = [];
      snapshot.forEach((doc) => {
        messageData.push({
          id: doc.id,
          ...doc.data(),
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
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};

export default Messages;

