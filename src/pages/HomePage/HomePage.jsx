import SignOut from "../../components/SignOut/SignOut";
import SignIn from "../../components/SignIn/SignIn";
import "./HomePage.scss";
import { OrganizationSwitcher, UserButton } from "@clerk/clerk-react";
import { useState,useEffect } from "react";
import { db } from "../../firebase-config"
import { addDoc ,getDocs, collection } from "firebase/firestore";

import { useUser } from "@clerk/clerk-react";

const HomePage = () => {
  const { user } = useUser();
  console.log(user.fullName);
  console.log(user.emailAddresses[0].emailAddress);
  console.log(user.id);
  console.log(user.imageUrl)
  const uid = user.id;
  const [groupName, setGroupName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userList, setUserList] = useState([]);

  // Function to fetch the user list from Firestore
  const fetchUserList = async () => {
    try {
      const userCollection = collection(db, 'users');
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
      console.error('Error fetching user list:', error);
    }
  };

  useEffect(() => {
    // Fetch the user list when the component mounts
    fetchUserList();
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
      // Combine user IDs to create a unique group chat ID
      const groupChatId = selectedUsers.concat(uid).sort().join('-');

      // Create a new chat room in Firebase
      await addDoc(collection(db, 'chats').doc(groupChatId), {
        groupName,
        members: selectedUsers,
      });

      // Reset form
      setGroupName('');
      setSelectedUsers([]);
    }
  };



  return (
    <div className="home">
      <h1 className="home__title"> Welcome !</h1>
      <SignIn />
      <SignOut />

      <OrganizationSwitcher />
      <UserButton />
      <div>
      <h2>Create a Group Chat</h2>
      <label>
        Group Name:
        <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
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
    </div>
  );
};

export default HomePage;
