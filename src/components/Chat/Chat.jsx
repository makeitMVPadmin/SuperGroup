import { useEffect, useState } from "react";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import "./Chat.scss";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-config";

const Chat = ({ chatId, uid }) => {
  const [chatData, setChatData] = useState(null);

  useEffect(() => {
    // Fetch chat data from Firestore based on chatId
    const fetchChatData = async () => {
      try {
        const chatRef = doc(db, "chatRooms", chatId); // Updated collection reference to "chatRooms"
        const chatSnapshot = await getDoc(chatRef);

        if (chatSnapshot.exists()) {
          const chatInfo = chatSnapshot.data();
          setChatData(chatInfo);
        } else {
          // Handle the case where the chat does not exist
          console.error("Chat not found");
        }
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };

    fetchChatData();
  }, [chatId]);

  return (
    <div className="chat">
      <div className="chat__info">
        <span>{chatData ? chatData.chatRoomName : "Loading..."}</span>
        <div className="chat__info-users">
          <div className="placeholder"></div>
          <div className="placeholder"></div>
          {/* <img src="" alt="Active Users"/>
          <img src="" alt="User Settings"/> */}
        </div>
      </div>
      <Messages chatId={chatId} uid={uid} />
      <Input chatId={chatId} uid={uid} />
    </div>
  );
};

export default Chat;
