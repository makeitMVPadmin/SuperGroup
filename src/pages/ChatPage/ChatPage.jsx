import Chat from "../../components/Chat/Chat"
import ChatDetails from "../../components/ChatDetails/ChatDetails"
import "./ChatPage.scss"

const ChatPage = () => {
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