import { auth, provider } from "../../firebase-config";
import { signInWithPopup } from "firebase/auth";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export const Auth = (props) => {
  const { setIsAuth } = props;
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user.uid);
      //once we've authenticated set cookie to "auth-token"
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (error) {
      console.error(error);
    }
  };
  //   const signInWithGoogle = () => {
  //     signInWithPopup(auth, provider)
  //       .then((user) => {
  //         console.log(user);
  //         // User is signed in!
  //       })
  //       .catch((error) => {
  //         // Handle error
  //       });
  //   };

  return (
    <div className="auth">
      <p>Sign In With Google</p>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  );
};
