import React, { useEffect, useState } from "react";
import Message from "../Message/Message";
import "./Messages.scss";
import { onSnapshot, doc, collection } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useUser } from "@clerk/clerk-react";

const Messages = () => {
  // const [messages, setMessages] = useState([]);

  // const { user } = useUser();

  // useEffect(() => {
  //   const chatRef = collection(db, "chats", user.uid);
  
  //   const unSub = onSnapshot(chatRef, (querySnapshot) => {
  //     const messageData = [];
  //     querySnapshot.forEach((doc) => {
  //       if (doc.exists()) {
  //         messageData.push(doc.data());
  //       }
  //     });
  //     setMessages(messageData);
  //   }, (error) => {
  //     console.error("Error fetching messages:", error);
  //   });
  
  //   return () => {
  //     unSub();
  //   };
  // }, [user.uid]);
  

  return (
    <div className="messages">
      {/* {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))} */}
      <Message/>
    </div>
  );
};

export default Messages;

