import Input from "../Input/Input"
import Messages from "../Messages/Messages"
import "./Chat.scss"

const Chat = () => {
  return (
    <div className="chat">
      <div className="chat__info">
        <span>Corprate Groupchat</span>
        <div className="chat__info-users">
          <div className="placeholder"></div>
          <div className="placeholder"></div>
          {/* <img src="" alt="Active Users"/>
          <img src="" alt="User Settings"/> */}
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat