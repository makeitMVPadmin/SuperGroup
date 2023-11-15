import SignOut from "../../components/SignOut/SignOut";
import SignIn from "../../components/SignIn/SignIn";
import "./HomePage.scss";
import { OrganizationSwitcher, UserButton } from "@clerk/clerk-react";

import { useUser } from "@clerk/clerk-react";

const HomePage = () => {
  const { user } = useUser();
  console.log(user.fullName);
  console.log(user.emailAddresses[0].emailAddress);
  console.log(user.id);
  console.log(user.imageUrl)

  return (
    <div className="home">
      <h1 className="home__title"> Welcome !</h1>
      <SignIn />
      <SignOut />

      <OrganizationSwitcher />
      <UserButton />
    </div>
  );
};

export default HomePage;
