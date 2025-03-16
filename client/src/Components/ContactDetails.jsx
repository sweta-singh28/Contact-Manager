import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { getContactById,deleteContact } from "../api/contacts";
import ContactForm from "./ContactForm"; // Import the ContactForm component
import "./../css/ContactDetails.css";
import { Trash2, Pencil } from "lucide-react"; // Import both Trash2 and Pencil icons

const ContactDetails = () => {
  const { id } = useParams(); // Get the contact ID from URL parameters
  const [contact, setContact] = useState(null); // Store contact details
  const [modal, setModal] = useState(false); // State to handle modal visibility
  const navigate= useNavigate();
  const fetchContact = async () => {
    const data = await getContactById(id);
    const contact = data;
    setContact(contact);
  };

  useEffect(() => {
    fetchContact();
  }, [id]);
  const onDeleteClick = async ()=>{
     try {
       await deleteContact(id); 
       alert("Contact deleted successfully!"); 
       navigate("/"); 
     } catch (error) {
       console.error("Failed to delete contact:", error);
       alert("Failed to delete contact. Please try again.");
     }
  }
  const toggleModal = () => {
    setModal(!modal);
    fetchContact();
  }; // Function to toggle the modal

  return (
    <Card className="mt-4 position-relative">
      <CardBody>
        {contact ? (
          <>
            {/* Buttons placed at the top-right corner */}
            <div className="position-absolute top-0 end-0 p-3">
              {/* Delete Button */}
              <Button
                onClick={onDeleteClick}
                className="p-0 border-0 bg-transparent"
                style={{ fontSize: "16px" }}
              >
                <Trash2 size={16} />
              </Button>

              {/* Edit Button */}
              <Button
                onClick={toggleModal}
                className="ml-4 p-0 border-0 bg-transparent" // Added large left margin
                style={{ fontSize: "16px" }}
              >
                <Pencil size={16} />
              </Button>
            </div>

            {/* Contact Information */}
            <CardTitle tag="h4">{contact.Name}</CardTitle>
            <CardText>Phone: {contact.Number}</CardText>
            <CardText>Email: {contact.Email}</CardText>
            <CardText>Gender: {contact.Gender}</CardText>
            <CardText>Location: {contact.Location}</CardText>

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
