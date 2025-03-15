import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { getContactById } from "../api/contacts";
import ContactForm from "./ContactForm"; // Import the ContactForm component
import "./../css/ContactDetails.css";
import { Trash2, Pencil } from "lucide-react"; // Import both Trash2 and Pencil icons

const ContactDetails = () => {
  const { id } = useParams(); // Get the contact ID from URL parameters
  const [contact, setContact] = useState(null); // Store contact details
  const [modal, setModal] = useState(false); // State to handle modal visibility

  const fetchContact = async () => {
    const data = await getContactById(id);
    const contact = data;
    setContact(contact);
  };

  useEffect(() => {
    fetchContact();
  }, [id]);

  const toggleModal = () => {
    setModal(!modal);
    fetchContact();
  }; // Function to toggle the modal

  return (
    <Card className="mt-4">
      <CardBody>
        {contact ? (
          <>
            <CardTitle tag="h4">{contact.Name}</CardTitle>
            <CardText>Phone: {contact.Number}</CardText>
            <CardText>Email: {contact.Email}</CardText>
            <CardText>Gender: {contact.Gender}</CardText>
            <CardText>Location: {contact.Location}</CardText>
            {/* Add Trash2 icon for deleting */}
            <Button color="danger" className="ml-2">
              <Trash2 size={20} /> 
            </Button>
            {/* Add Pencil icon for editing */}
            <Button color="primary" className="ml-2" onClick={toggleModal}>
              <Pencil size={20} /> 
            </Button>

            {/* Modal for ContactForm */}
            <Modal isOpen={modal} toggle={toggleModal}>
              <ModalHeader toggle={toggleModal}>Edit Contact</ModalHeader>
              <ModalBody>
                <ContactForm
                  contact={contact}
                  closeModal={toggleModal}
                  isEditing={true}
                />
              </ModalBody>
            </Modal>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </CardBody>
    </Card>
  );
};

export default ContactDetails;
