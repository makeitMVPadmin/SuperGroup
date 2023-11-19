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
    <div>
      <button className="account__button" onClick={toggleAccountProfileModal}>
        Settings
      </button>
      <Modal
        isOpen={accountProfileModalOpen}
        onRequestClose={setAccountProfileModalOpen}
        className="modal"
      >
        <div className="modal-content-x">
          <button
            className="modal-close-button"
            onClick={toggleAccountProfileModal}
          >
            X
          </button>
          <UserProfile />
        </div>
      </Modal>
    </div>
  );
};

export default AccountButton;
