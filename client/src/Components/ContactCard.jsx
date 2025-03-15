import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "./../css/ContactCard.css";

const ContactCard = ({ contact }) => {
  // Initialize navigation function
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/contact/${contact.id}`)}
      className="contact-card"
    >
      <CardBody>
        <CardTitle tag="h5">{contact.Name}</CardTitle>
      </CardBody>
    </Card>
  );
};

export default ContactCard;
