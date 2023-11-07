import "./HomePage.scss";
import { useUser } from "@clerk/clerk-react";
const HomePage = () => {
  const { user } = useUser();
  console.log(user.username);
  console.log(user.emailAddresses[0].emailAddress);
  console.log(user.id);

  return (
    <div className="home">
      <h1 className="home__title"> Welcome !</h1>
    </div>
  );
};

export default HomePage;
