import Chat from "../../components/Chat/Chat";
import ChatDetails from "../../components/ChatDetails/ChatDetails";
import "./ChatPage.scss";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const ChatPage = () => {
  const { chatId } = useParams();
  const { user } = useUser();
  const uid = user.id;

  // Now you can access chatId as a variable
  console.log(chatId);
  return (
    <div className="chatpage">
      <div className="chatpage__container">
        <ChatDetails chatId={chatId} />
        <Chat chatId={chatId} uid={uid} />
      </div>
    </div>
  );
};

export default ChatPage;
