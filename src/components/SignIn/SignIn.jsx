import "./SignIn.scss";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { getAuth, signInWithCustomToken } from "firebase/auth";

const auth = getAuth();

const Authentication = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    const signInWithClerk = async () => {
      try {
        const token = await getToken({ template: "integration_firebase" });
        // console.log(token);
        const userCredentials = await signInWithCustomToken(auth, token);
        console.log(userCredentials);
        console.log("Authenticated user:", userCredentials.user);
      } catch (error) {
        console.error("Error signing in with Clerk token:", error);
      }
    };

    signInWithClerk();
  }, [getToken]);

  return <></>;
};

export default Authentication;
