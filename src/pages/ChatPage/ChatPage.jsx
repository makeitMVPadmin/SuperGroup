import Chat from "../../components/Chat/Chat"
import ChatDetails from "../../components/ChatDetails/ChatDetails"
import "./ChatPage.scss"
import { useParams } from "react-router-dom"

const ChatPage = () => {
  const { chatId } = useParams();

  // Now you can access chatId as a variable
  console.log(chatId);
  return (
    <div className="chatpage">
        <div className="container">
            <Chat/>
            <ChatDetails/>
        </div>
    </div>
  )
}

export default ChatPage