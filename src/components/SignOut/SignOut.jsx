import "./SignOut.scss";
import React from "react";
import { auth } from "../../firebase-config";
import { signOut } from "firebase/auth";
import { useAuth } from "@clerk/clerk-react";

const SignOut = () => {
  const { signOut: clerkSignOut } = useAuth();

  const handleSignOut = async () => {
    await signOut(auth);

    clerkSignOut().catch((error) => {
      console.error("Error signing out from Clerk:", error);
    });
  };

  return (
    <button className="logout__button" onClick={handleSignOut}>
      Sign Out
    </button>
  );
};

export default SignOut;
