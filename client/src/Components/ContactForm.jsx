import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import ContactForm from "./ContactForm";

const ContactDetails = () => {
  const [modal, setModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Toggle modal
  const toggle = () => setModal(!modal);

  // Open modal for adding a new contact
  const handleAddContact = (e) => {
    e.preventDefault();
    setSelectedContact(null);
    setIsEditing(false);
    setModal(true);
  };

  // Open modal for editing an existing contact
  const handleEditContact = (contact) => {
    setSelectedContact(contact);
    setIsEditing(true);
    setModal(true);
  };

  return (
    <div>
      <Button color="primary" onClick={handleAddContact}>
        +
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {isEditing ? "Edit Contact" : "Add Contact"}
        </ModalHeader>
        <ModalBody>
          <ContactForm contact={selectedContact} isEditing={isEditing} />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ContactDetails;
