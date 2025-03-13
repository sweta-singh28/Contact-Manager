import React, { useState, useEffect } from "react";
import {
  Container,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm"; // Import ContactForm
import { getContacts } from "../api/contacts";
import "./../css/home.css";

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false); // Controls modal visibility
  const [selectedContact, setSelectedContact] = useState(null); // Stores contact for editing

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await getContacts();
        if (response) {
          setContacts(response);
        } else {
          setContacts([]);
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setContacts([]);
      }
    };
    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter((contact) =>
    contact.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open modal for adding a new contact
  const handleAddClick = () => {
    setSelectedContact(null); // Ensure it's empty for a new contact
    setModalOpen(true);
  };

  // Open modal for editing a contact
  const handleEditClick = (contact) => {
    setSelectedContact(contact);
    setModalOpen(true);
  };

  return (
    <Container className="mt-4" id="container">
      <h2 className="text-center mb-3">Contact Manager</h2>
      <Input
        type="text"
        placeholder="Search contacts..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ContactList contacts={filteredContacts} onEdit={handleEditClick} />

      {/* Plus Button to Open Modal for Adding Contact */}
      <Button
        color="primary"
        className="rounded-circle position-fixed bottom-0 end-0 m-4"
        style={{ width: "50px", height: "50px" }}
        onClick={handleAddClick}
      >
        +
      </Button>

      {/* Modal for Adding or Editing Contact */}
      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
        <ModalHeader toggle={() => setModalOpen(false)}>
          Add new Contact
        </ModalHeader>
        <ModalBody>
          <ContactForm
            closeModal={() => setModalOpen(false)}
            contact={null} // Pass contact if editing
            isEditing={false}
          />
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default Home;
