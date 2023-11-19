import "./ChatDetails.scss";
import ChatIcon from "../../assets/icons/chaticon.png";
import AccountButton from "../AccountButton/AccountButton";
import MembersButton from "../MembersButton/MembersButton";
import DashboardButton from "../DashboardButton/DashboardButton";
import SignOut from "../SignOut/SignOut";

const ChatDetails = () => {
  return (
    <div className="chatdetails">
      <div>
        <img src={ChatIcon} alt="MakeItMVP" />
      </div>
      <div>
        <h2 className="chatdetails__super">Supergroup</h2>
      </div>
      <MembersButton />
      <DashboardButton />
      <AccountButton />
      <SignOut />
    </div>
  );
};

export default ChatDetails;
