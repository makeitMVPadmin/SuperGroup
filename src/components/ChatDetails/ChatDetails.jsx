import "./ChatDetails.scss";
import ChatIcon from "../../assets/icons/chaticon.png";
import AccountButton from "../AccountButton/AccountButton";
import DashboardButton from "../DashboardButton/DashboardButton";
import SignOut from "../SignOut/SignOut";
import AddMembers from "../AddMembers/AddMembers";

const ChatDetails = ({ chatId ,selectedUsers }) => {
  return (
    <div className="chatdetails">
      <div>
        <img src={ChatIcon} alt="MakeItMVP" />
      </div>
      <div>
        <h2 className="chatdetails__super">Supergroup</h2>
      </div>
      <AddMembers chatId={chatId} selectedUsers={selectedUsers} />
      <DashboardButton />
      <AccountButton />
      <SignOut />
    </div>
  );
};

export default ChatDetails;
