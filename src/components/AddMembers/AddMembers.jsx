import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { collection, getDocs, getDoc, doc,updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

import "./AddMembers.scss";

const AddMembers = ({chatId, selectedUsers = [], handleUserSelection }) => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [userList, setUserList] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const toggleAddModal = () => {
    setAddModalOpen(!isAddModalOpen);
  };

  useEffect(() => {
    Modal.setAppElement("#root"); // Replace "#root" with the ID of your root element

    const fetchUserList = async () => {
      try {
        const userCollection = collection(db, "users");
        const querySnapshot = await getDocs(userCollection);

        const users = [];
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          users.push({
            id: doc.id,
            name: userData.displayName,
          });
        });

        setUserList(users);
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    };

    fetchUserList();
  }, []);

  const availableMembers = userList.filter((user) => !selectedUsers.includes(user.id));

  const handleCheckboxChange = (userId) => {
    if (selectedMembers.includes(userId)) {
      setSelectedMembers(selectedMembers.filter((id) => id !== userId));
    } else {
      setSelectedMembers([...selectedMembers, userId]);
    }
  };

  const handleSubmit = async () => {
    if (selectedMembers.length === 0) {
      console.log("No members selected.");
      return;
    }
  
    try {
      const chatRoomId = chatId; // Replace with the chat room ID
      const chatRoomRef = doc(db, "chatRooms", chatRoomId);
  
      const chatRoomSnapshot = await getDoc(chatRoomRef);
      if (!chatRoomSnapshot.exists()) {
        console.error("Chat room not found.");
        return;
      }
  
      const chatRoomData = chatRoomSnapshot.data();
      const existingMembers = chatRoomData.members || [];
  
      const updatedMembers = Array.from(new Set([...existingMembers, ...selectedMembers]));
  
      await updateDoc(chatRoomRef, {
        members: updatedMembers,
      });
  
      console.log("Members added successfully:", selectedMembers);
      // Optionally, you can perform additional actions or state updates after adding members
      toggleAddModal(); // Close the modal after adding members
    } catch (error) {
      console.error("Error adding members to chat room:", error);
    }
  };
  
  return (
    <>
      <button className="Add__button" onClick={toggleAddModal}>
        + Add Members
      </button>
      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={toggleAddModal}
        className="modal"
      >
        <div className="modal-content">
          <button className="modal-close-button" onClick={toggleAddModal}>
            X
          </button>
          <div className="addPrompt">
            <h3 className="addPrompt__title">Available Members:</h3>
            <ul>
              {availableMembers.map((user) => (
                <li key={user.id}>
                  <label className="addPrompt__members">
                    <input className="addPrompt__check"
                      type="checkbox"
                      value={user.id}
                      checked={selectedMembers.includes(user.id)}
                      onChange={() => handleCheckboxChange(user.id)}
                    />
                    {user.name}
                  </label>
                </li>
              ))}
            </ul>
            <button className="addPrompt__button" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddMembers;


