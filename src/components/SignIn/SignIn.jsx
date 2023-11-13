import "./SignIn.scss";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { useUser } from "@clerk/clerk-react";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { setDoc, doc } from "firebase/firestore";
// import { storage, db } from "../../firebase-config"



const auth = getAuth();

const Authentication = () => {
  const { getToken } = useAuth();
  const { user } = useUser();
  const fullName = user.fullName
  const email = user.emailAddresses[0].emailAddress;
  const uid = user.id;
  const photoUrl = user.imageUrl;
  console.log(fullName, email, uid , photoUrl)
  
  
  useEffect(() => {
    const signInWithClerk = async () => {
      
      try {
        const token = await getToken({ template: "integration_firebase" });
        console.log(token);
        const userCredentials = await signInWithCustomToken(auth, token);
        console.log(userCredentials);
        console.log("Authenticated user:", userCredentials.user);
        // const storageRef = ref(storage, fullName)
        // const uploadTask = uploadBytesResumable(storageRef);
        // uploadTask.on( 
        //   (error) => {
        //     console.log(error)
        //   }, 
        //   () => {
        //     getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
        //     await setDoc(doc( db,"users", user.uid),{
        //       fullName,
        //       email,
        //       uid,
        //       photoUrl
        //     })
        //   });
        // }
        // );
      } catch (error) {
        console.error("Error signing in with Clerk token:", error);
      }

    };

    signInWithClerk();
  }, [getToken]);

  return <></>;
};

export default Authentication;
