import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { getContacts } from "../api/contacts";

const ContactDetails = () => {
  const { id } = useParams(); // Get the contact ID from URL parameters
  const [contact, setContact] = useState(null); // Store contact details

  useEffect(() => {
    const fetchContact = async () => {
      // Fetch all contacts
      const data = await getContacts();

      // Find the contact by ID (assuming 'id' exists in the response)
      const contact = data.find((contact) => contact.id === id);

      setContact(contact); // Set the found contact details
    };

    fetchContact(); // Fetch the contact when the component mounts
  }, [id]); // Trigger fetch whenever 'id' changes

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
            <Button color="primary">Edit</Button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </CardBody>
    </Card>
  );
};

export default ContactDetails;
