import SignOut from "../../components/SignOut/SignOut";
import SignIn from "../../components/SignIn/SignIn";
import "./HomePage.scss";
import AccountButton from "../../components/AccountButton/AccountButton";
import MembersButton from "../../components/MembersButton/MembersButton";

// import { useUser } from "@clerk/clerk-react";

const HomePage = () => {
  // const { user } = useUser();
  // console.log(user.username);
  // console.log(user.emailAddresses[0].emailAddress);
  // console.log(user.id);

  return (
    <div className="home">
      <h1 className="home__title"> Welcome !</h1>

      <SignIn />
      <SignOut />
      <AccountButton />
      <MembersButton />
    </div>
  );
};

export default HomePage;
