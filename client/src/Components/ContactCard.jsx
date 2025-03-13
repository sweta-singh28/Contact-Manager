import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import { useNavigate } from "react-router-dom";

const ContactCard = ({ contact }) => {
  //initialization of navigation fun
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/contact/${contact.id}`)} className="mb-2">
      <CardBody>
        <CardTitle tag="h5">{contact.Name}</CardTitle>{" "}
        {/* Corrected field name */}
        {/* <CardText><strong>Email:</strong> {contact.Email}</CardText>
        <CardText><strong>Number:</strong> {contact.Number}</CardText>
        <CardText><strong>Gender:</strong> {contact.Gender}</CardText>
        <CardText><strong>Location:</strong> {contact.Location}</CardText> */}
      </CardBody>
    </Card>
  );
};

export default ContactCard;
//Render all the data thats incoming by checking the console