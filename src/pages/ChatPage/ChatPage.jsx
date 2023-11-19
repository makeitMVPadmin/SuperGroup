import Chat from "../../components/Chat/Chat"
import ChatDetails from "../../components/ChatDetails/ChatDetails"
import "./ChatPage.scss"
import { useParams } from "react-router-dom"
import { useUser } from "@clerk/clerk-react"
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

const ChatPage = () => {
  const { chatId } = useParams();
  const { user } = useUser();
  const uid = user.id;
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    const fetchSelectedUsers = async () => {
      try {
        const chatRoomRef = doc(db, "chatRooms", chatId);
        const chatRoomSnapshot = await getDoc(chatRoomRef);

        if (chatRoomSnapshot.exists()) {
          const chatRoomData = chatRoomSnapshot.data();
          setSelectedUsers(chatRoomData.members || []);
        }
      } catch (error) {
        console.error("Error fetching selected users:", error);
      }
    };

    fetchSelectedUsers();
  }, [chatId]);

  return (
    <div className="chatpage">
      <div className="chatpage__container">
        <ChatDetails chatId={chatId} />
        <Chat chatId={chatId} selectedUsers={selectedUsers} uid={uid} />
      </div>
    </div>
  );
};

export default ChatPage;
