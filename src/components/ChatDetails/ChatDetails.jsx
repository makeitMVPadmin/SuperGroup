import AddMembers from "../AddMembers/AddMembers";
import "./ChatDetails.scss";

const ChatDetails = ({ chatId ,selectedUsers }) => {
  return (
    <div className="chatdetails">
      <div className="chatdetails__title">
        <h3>Chat Details</h3>
      </div>
      <div className="chatdetails__members">
        <h4>Members</h4>
      </div>
      <AddMembers chatId={chatId} selectedUsers={selectedUsers} />
    </div>
  );
};

export default ChatDetails;
