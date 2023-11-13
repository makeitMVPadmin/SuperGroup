import SignOut from "../../components/SignOut/SignOut";
import SignIn from "../../components/SignIn/SignIn";
import "./HomePage.scss";
import {
  CreateOrganization,
  OrganizationProfile,
  OrganizationSwitcher,
  OrganizationList,
  UserButton,
} from "@clerk/clerk-react";
// import { useUser } from "@clerk/clerk-react";

// function setActive({
//   session,
//   organization,
//   beforeEmit,
// }: SetActiveParams): Promise<void>;

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
      {/* <CreateOrganization />
      <OrganizationProfile /> */}
      <OrganizationSwitcher />
      {/* <OrganizationList /> */}
      <UserButton />
    </div>
  );
};

export default HomePage;
