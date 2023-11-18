// import "./Ai.scss";
// import React, { useState, useRef } from "react";
// import { db, auth } from "../../firebase-config";
// import logo from "../../assets/logos/logo1.svg";
// import logo2 from "../../assets/logos/logo2.svg";
// import up from "../../assets/icons/up.svg";
// import down from "../../assets/icons/down.svg";
// import profile from "../../assets/images/Mohan-muruge.jpg";
// import { Auth } from "../Auth/Auth";
// import { TestChat } from "../TestChat/TestChat";
// import { signOut } from "firebase/auth";
// import Cookies from "universal-cookie";

// import { Configuration, OpenAIApi } from "openai";
// import { config } from "dotenv";
// config();
// const cookies = new Cookies();
// function Ai() {
//   console.log(process.env.OPENAI_API_KEY);
//   const openai = new OpenAIApi(
//     new Configuration({
//       apiKey: process.env.OPENAI_API_KEY,
//     })
//   );
//   openai
//     .createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: "Hello Chat" }],
//     })
//     .then((res) => {
//       console.log(res.data.choices);
//     });

//   return (
//     <main>
//       {/* is room null or not, if it isn't null, display the chat,if it is null we want the user to type in a room ID */}
//       <div>
//         <>
//           <div className="test__container">
//             <div className="test__row">
//               <label for="test__image">
//                 <input
//                   id="test__image"
//                   className="test__image"
//                   type="image"
//                   name="image"
//                   src={profile}
//                   alt="Mohan-muruge"
//                 />
//               </label>
//               <label for="test__label" className="test__message-label">
//                 <input
//                   id="comments__input-name"
//                   className="test__input"
//                   name="fullName"
//                   type="text"
//                   placeholder="Enter your name"
//                   required
//                 />
//               </label>
//             </div>
//           </div>
//           <div className="test__ai">
//             <div className="test__ai-container">
//               <div className="test__ai-message">
//                 <p className="test__message">
//                   Of course, here are the stats from last quarter: There was a
//                   5% increase in sales generated from ad revenue and a 1.5%
//                   decrease in webpage abandonment.
//                 </p>
//                 <div className="test__feedback">
//                   <span className="test__span">Was this helpful?</span>
//                   <div className="test__feedback-icons">
//                     <img className="test__img1" src={up} alt="Thumbs up" />
//                     <img className="test__img2" src={down} alt="Thumbs down" />
//                   </div>
//                 </div>
//               </div>
//               <div className="test__ai-img"></div>
//             </div>
//             <div className="test__improve-container">
//               <p className="test__message">Please describe how I can improve</p>
//               <div className="test__ai-img"></div>
//             </div>
//           </div>
//         </>
//       </div>
//     </main>
//   );
// }
// export default Ai;


  // useEffect(() => {
  //   // Initialize Firebase Firestore
  //   // const db = firebase.firestore();

  //   // Retrieve chat messages from Firestore
  //   const unsubscribe = db
  //     .collection("messages-test")
  //     .orderBy("timestamp")
  //     .onSnapshot((snapshot) => {
  //       setMessages(
  //         snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  //       );
  //     });

  //   return () => {
  //     unsubscribe(); // Detach the listener when component unmounts
  //   };
  // }, []);

  // const sendMessage = () => {
  //   // Send message to Firebase Firestore
  //   // const db = firebase.firestore();
  //   db.collection("messages-test").add({
  //     text: input,
  //     timestamp: serverTimestamp(),
  //     // timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //     // You might include userID or user information here for better identification
  //   });
  //   setInput("");
  // };

// // ChatComponent.js (React component for chat interface)
// import React, { useState, useEffect } from "react";
// // import firebase from "firebase/app";
// import { addDoc, onSnapshot, serverTimestamp, collection } from "firebase/firestore";

// // import "firebase/firestore";
// import { db } from "../../firebase-config";

// const ChatComponent = () => {
//   const [messages, setMessages] = useState([]); //stores array of messages received from firestore
//   const [input, setInput] = useState(""); //stores the uses input in the chat

//   //used to perform side effects in the component, when the component mounts it sets up a listener to the 
//   //firestore collection messages-test using onSnapshot
//   //it retrieves and updates the messages state array whenever there is a change in the firestore collection
//   useEffect(() => {
//     const messagesRef = collection(db, "messages-test");

//     const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
//       const messageData = [];
//       snapshot.forEach((doc) => {
//         messageData.push({ id: doc.id, ...doc.data() });
//       });
//       setMessages(messageData);
//     });

//     return () => {
//       unsubscribe(); // Detach the listener when component unmounts
//     };
//   }, []);

//   //triggered when the user clicks send button
//   //it adds a new document to the firestore collection messages-tests with the users inputt ext and timestamp
//   const sendMessage = async () => {
//     try {
//       await addDoc(collection(db, "messages-test"), {
//         text: input,
//         timestamp: serverTimestamp(),
//       });
//       setInput("");
//     } catch (error) {
//       console.error("Error adding document:", error);
//     }
//   };

//   const handleInputChange = (event) => {
//     setInput(event.target.value);
//   };

//   return (
//     <div>
//       <div>
//         {messages.map((message) => (
//           <p key={message.id}>{message.text}</p>
//         ))}
//       </div>
//       <input type="text" value={input} onChange={handleInputChange} />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// export default ChatComponent;

//ChatComponent listens to changes in the Firestore collection "messages-test," 
//updates the messages state accordingly, allows users to send messages to Firestore, 
//and displays the messages in the chat interface.

import React, { useState, useEffect } from "react";
import { addDoc, collection, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase-config";

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const messagesRef = collection(db, "messages-test");

    const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
      const messageData = [];
      snapshot.forEach((doc) => {
        const docData = doc.data();
        if (docData.messages) {
          messageData.push(...docData.messages);
        }
      });
      setMessages(messageData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const sendMessage = async () => {
    try {
      await addDoc(collection(db, "messages-test"), {
        messages: [
          ...messages,
          { text: input, timestamp: "serverTimestamp()" }
        ]
      });
      setInput("");
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  // Extracting the last message
  const lastMessage = messages[messages.length - 1];

  return (
    <div>
      <div>
        {/* Displaying the text and timestamp of the last message */}
        {lastMessage && (
          <p>
            Last Message: {lastMessage.text} - {lastMessage.timestamp}
          </p>
        )}
      </div>
      <input type="text" value={input} onChange={handleInputChange} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatComponent;
