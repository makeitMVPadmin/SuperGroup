<<<<<<< HEAD
import SignOut from "../../components/SignOut/SignOut";
import SignIn from "../../components/SignIn/SignIn";
import "./HomePage.scss";
import { OrganizationSwitcher, UserButton } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  updateDoc,
  serverTimestamp,
  getDocs,
  addDoc, // Added for adding messages
} from "firebase/firestore";
=======
import "./HomePage.scss";
// import SignIn from "../../components/SignIn/SignIn";
>>>>>>> develop

import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { user } = useUser();
  console.log(user.fullName);
  console.log(user.emailAddresses[0].emailAddress);
  console.log(user.id);
  console.log(user.imageUrl);
  const uid = user.id;
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userList, setUserList] = useState([]);
  const [groupChats, setGroupChats] = useState([]);

  // Function to fetch the user list from Firestore
  const fetchUserList = async () => {
    try {
      const userCollection = collection(db, "users");
      const querySnapshot = await getDocs(userCollection);

      const users = [];
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        // Exclude the current user from the user list
        if (doc.id !== uid) {
          users.push({
            id: doc.id,
            name: userData.displayName,
          });
        }
      });

      setUserList(users);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  // Function to fetch and update the list of group chats
  const fetchGroupChats = async () => {
    try {
      const chatsCollection = collection(db, "chatRooms");
      const querySnapshot = await getDocs(chatsCollection);

      const chats = [];
      querySnapshot.forEach((doc) => {
        const chatData = doc.data();
        chats.push({
          id: doc.id,
          groupName: chatData.chatRoomName,
          members: chatData.members,
        });
      });

      setGroupChats(chats);
    } catch (error) {
      console.error("Error fetching group chats:", error);
    }
  };

  useEffect(() => {
    // Fetch the user list when the component mounts
    fetchUserList();
    fetchGroupChats();
  }, [uid]);

  // Function to handle user selection
  const handleUserSelection = (uid) => {
    if (selectedUsers.includes(uid)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== uid));
    } else {
      setSelectedUsers([...selectedUsers, uid]);
    }
  };

  // Function to create a group chat
  const createGroupChat = async () => {
    if (groupName && selectedUsers.length > 0) {
      // Create a new chat room in Firebase
      const chatRoomRef = doc(db, "chatRooms", groupName); // Use 'groupName' as the document ID

      // Check if the document already exists
      const chatRoomSnapshot = await getDoc(chatRoomRef);

      if (chatRoomSnapshot.exists()) {
        // Handle the case where the group chat already exists
        console.error("Group chat with the same name already exists.");
        return;
      }

      const chatRoomDoc = {
        chatRoomName: groupName,
        members: [...selectedUsers, uid],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      try {
        const chatRoomResult = await setDoc(chatRoomRef, chatRoomDoc);

        // Create 'messages' subcollection for the chat room
        const messagesCollection = collection(chatRoomRef, "messages");

        // Example message
        const exampleMessage = {
          text: "Welcome to the chat!",
          senderId: uid,
          timestamp: serverTimestamp(),
        };

        // Add the example message to the 'messages' subcollection
        await addDoc(messagesCollection, exampleMessage);

        // Reset form
        setGroupName("");
        setSelectedUsers([]);
      } catch (error) {
        console.error("Error creating group chat:", error);
      }
    }
  };

  return (
    <div className="home">
      <h1 className="home__title"> Welcome !</h1>
<<<<<<< HEAD
      <SignIn />
      <SignOut />

      <OrganizationSwitcher />
      <UserButton />
      <div>
        <h2>Create a Group Chat</h2>
        <label>
          Group Name:
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </label>
        <h3>Select Users to Add:</h3>
        <ul>
          {userList.map((user) => (
            <li key={user.id}>
              <label>
                <input
                  type="checkbox"
                  value={user.id}
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleUserSelection(user.id)}
                />
                {user.name}
              </label>
            </li>
          ))}
        </ul>
        <button onClick={createGroupChat}>Create Group Chat</button>
      </div>
      <div>
        <h2>Group Chats</h2>
        <ul>
          {groupChats.map((chat) => (
            <Link key={chat.id} to={`/chat/${chat.id}`}>
              <li>
                <strong>{chat.groupName}</strong>
                <p>Members: {chat.members.join(", ")}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
=======
      {/* <SignIn /> */}
>>>>>>> develop
    </div>
  );
};

export default HomePage;




