import React from "react";
import Modal from "react-modal";
import { useState } from "react";
import { UserProfile } from "@clerk/clerk-react";
import "./AccountButton.scss";

const AccountButton = () => {
  const [accountProfileModalOpen, setAccountProfileModalOpen] = useState(false);

  const toggleAccountProfileModal = () => {
    setAccountProfileModalOpen(!accountProfileModalOpen);
  };
  return (
    <>
      <button onClick={toggleAccountProfileModal}>Settings</button>
      <Modal
        isOpen={accountProfileModalOpen}
        onRequestClose={setAccountProfileModalOpen}
        className="modal"
      >
        <div className="modal-content">
          <button
            className="modal-close-button"
            onClick={toggleAccountProfileModal}
          >
            X
          </button>
          <UserProfile />
        </div>
      </Modal>
    </>
  );
};

export default AccountButton;
