import React from "react";
import Modal from "react-modal";
import { useState } from "react";
import { OrganizationProfile } from "@clerk/clerk-react";
import "./MembersButton.scss";

const MembersButton = () => {
  const [isMembersModalOpen, setMembersModalOpen] = useState(false);

  const toggleMemberModal = () => {
    setMembersModalOpen(!isMembersModalOpen);
  };
  return (
    <>
      <button onClick={toggleMemberModal}>Members</button>
      <Modal
        isOpen={isMembersModalOpen}
        onRequestClose={setMembersModalOpen}
        className="modal"
      >
        <div className="modal-content">
          <button className="modal-close-button" onClick={toggleMemberModal}>
            X
          </button>
          <OrganizationProfile />
        </div>
      </Modal>
    </>
  );
};

export default MembersButton;
