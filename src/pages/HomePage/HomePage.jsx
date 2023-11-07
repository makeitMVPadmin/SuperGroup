// import SignOut from "../../components/SignOut/SignOut"
// import SignIn from "../../components/SignIn/SignIn"
import "./HomePage.scss";
// import { useUser } from "@clerk/clerk-react";import SignIn from "../../components/"../../
const HomePage = () => {
  // const { user } = useUser();
  // console.log(user.username);
  // console.log(user.emailAddresses[0].emailAddress);
  // console.log(user.id);

  return (
    <div className="home">
      <SignIn />
      <h1 className="home__title"> Welcome !</h1>
      {/* <SignIn />
      <SignOut /> */}
    </div>
  );
};

export default HomePage;
