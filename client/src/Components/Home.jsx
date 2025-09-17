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
import "./../css/Home.css";
import logo from "../assets/logo.jpg";
import Logout from "./LogOut";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa"; // Social icons

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false); // Controls modal visibility
  const [selectedContact, setSelectedContact] = useState(null); // Stores contact for editing
  const userId = localStorage.getItem("email");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await getContacts(userId);
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
  }, [modalOpen, userId]);

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
    <>
      {/* Navbar */}
      <Container id="container">
        <nav className="navbar g-2 pb-3">
          <img src={logo} alt="Logo" className="navbar-logo" />
          <h1 className="navbar-title">ContactBook</h1>
          <Input
            type="text"
            placeholder="Search contacts..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
          <Logout />
        </nav>

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
            {selectedContact ? "Edit Contact" : "Add New Contact"}
          </ModalHeader>
          <ModalBody>
            <ContactForm
              closeModal={() => setModalOpen(false)}
              contact={selectedContact}
              isEditing={!!selectedContact}
            />
          </ModalBody>
        </Modal>
      </Container>

      {/* Footer */}
      <footer
        className="footer text-center py-3"
        style={{ backgroundColor: "#000", color: "white" }}
      >
        <p>© 2025 ContactBook. All rights reserved.</p>
        <div className="social-icons mt-2">
          <a
            href="https://x.com/SwetaSi53713188"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2"
            style={{ color: "white" }}
          >
            <FaTwitter size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/sweta-singh-991a35256/"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2"
            style={{ color: "white" }}
          >
            <FaLinkedin size={18} />
          </a>
          <a
            href="https://github.com/sweta-singh28"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2"
            style={{ color: "white" }}
          >
            <FaGithub size={18} />
          </a>
        </div>
      </footer>
    </>
  );
};

export default Home;
