import "./SignIn.scss";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { useUser } from "@clerk/clerk-react";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase-config"



const auth = getAuth();

const Authentication = () => {
  const { getToken } = useAuth();
  const { user } = useUser();
  const fullName = user.fullName
  const email = user.emailAddresses[0].emailAddress;
  const uid = user.id;
  const photoUrl = user.imageUrl;
  console.log(fullName, email, uid , photoUrl)

  const userRef = doc(db, "users", uid);

  // Change the document id to match user.uid
async function changeDocumentId (collectionName, oldId, newId) {
  // Get the document data
    const oldDocRef = doc(db, collectionName, oldId);
    const docSnapshot = await getDoc(oldDocRef);
    try {
        if (docSnapshot.exists ()) {
        // Copy the data to a new document with the new ID
            const newDocRef = doc(db, collectionName, newId);
            await setDoc(newDocRef, docSnapshot.data());
        // Delete the old document
            await deleteDoc(oldDocRef);
            console.log(`Document ID changed from ${oldId} to ${newId}`);
            } else {
            console.log(`Document with ID ${oldId} doesn't exist`);
        };
    } catch (e) {
        console.error('Error changing document ID:', e);
    }
};
  
  
  useEffect(() => {
    const signInWithClerk = async () => {
      
      try {
        const token = await getToken({ template: "integration_firebase" });
        console.log(token);
        const userCredentials = await signInWithCustomToken(auth, token);
        console.log(userCredentials);
        console.log("Authenticated user:", userCredentials.user);
        const userDoc = await getDoc(userRef);
        console.log(userDoc.data);
        if (userDoc.exists()) {
          // A document with the same UID already exists, handle it accordingly (e.g., update or show an error).
          console.log("User already exists:", userDoc.data());
        } else {
          // No document with the same UID exists, so you can add the new user data.
          await setDoc(userRef, {
            displayName: fullName,
            email: email,
            photoUrl: photoUrl,
            uid: uid
          });
          console.log("User added:", uid);
        }
      //   await addDoc(collection(db, "users"), {
      //     displayName: fullName,
      //     email: email,
      //     photoUrl: photoUrl,
      //     uid: uid
      // })
        // const docRef = await addDoc(collection(db, "userChats"),{ });
  
        
        // await changeDocumentId("userChats", docRef.id, uid)
        // console.log(uid)
      } catch (error) {
        console.error("Error signing in with Clerk token:", error);
      }

    };

    signInWithClerk();
  }, [getToken]);

  return <></>;
};

export default Authentication;
