import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import { useNavigate } from "react-router-dom";

const ContactCard = ({ contact }) => {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/contact/${contact.id}`)} className="mb-2">
      <CardBody>
        <CardTitle tag="h5">{contact.Name}</CardTitle>{" "}
        {/* Corrected field name */}
        <CardText>{contact.Number}</CardText> {/* Corrected field name */}
      </CardBody>
    </Card>
  );
};

export default ContactCard;
