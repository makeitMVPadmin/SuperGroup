import { auth, db } from "../../firebase-config";
import { useEffect, useState } from "react";
import {
  addDoc,
  serverTimestamp,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore"; //add a row in the db table, adds an entry (a document) into your collection
import "./TestChat.scss";
export const TestChat = (props) => {
  const { room } = props;
  const [newMessage, setNewMessage] = useState(""); //it is going to reflect what the user is typing in this input
  const [messages, setMessages] = useState([]);

  const messagesRef = collection(db, "messages-test"); //reference to the messages collection
  //so that firebase continuously automates our data, onsnapshot allows us to listen to those changes
  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("sentAt")
    );
    //snapshot requires a query that we want to listen to, so that we can recreate those changes, where is to only grab the ,essages from the room that we are in
    //grab messages woth snapshot variable
    console.log("gra");
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      try {
        let messages = [];
        snapshot.forEach((doc) => {
          //to get the data from each document
          messages.push({ ...doc.data(), id: doc.id }); //object that contains all the previous data from the document and add an id to differentiate it form eachother, the id doesn't exist on doc.data, it exists in doc.id
        }); //grab the data from the doc from doc.dataa, setting the new object of messages to be equal to whatever the data exists in the doc plus this new id
        //update state to keep track of all the messages so that we can see the changes happening in real time, we dont have that state so far so we have to create that state by cretating
        console.log(messages);
        setMessages(messages);
      } catch (error) {
        console.error("Error fetching messages: ", error);
      }
    });
    return () => unsuscribe(); //return and clean up the useeffect for performance
  }, []);
  const handleSubmit = async (e) => {
    //prevent page from refreshing
    e.preventDefault();
    //check if message is empty
    if (newMessage.trim() === "") return; //end the funtion if empty, we don't want to submit it to our db
    await addDoc(messagesRef, {
      messageText: newMessage,
      sentAt: serverTimestamp(),
      sentBy: auth.currentUser.displayName,
      room: room,
    }); //collection, what message object you want to add
    console.log(auth.currentUser);
    setNewMessage("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <h1>Welcome to: {room.toUpperCase()}</h1>
      </div>
      <div className="chat__messages">
        {messages.map((message) => (
          <div className="chat__message" key={message.id}>
            <span className="chat__user">{message.sentBy}:</span>
            {message.messageText}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chat__new-message-form">
        <input
          className="chat__new-message-input"
          placeholder="Type your message here..."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button type="submit" className="chat__send-btn">
          Send
        </button>
      </form>
    </div>
  );
};
