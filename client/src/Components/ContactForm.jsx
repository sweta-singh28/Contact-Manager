import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { addContact, updateContact } from "../api/contacts";

const ContactForm = ({ contact, isEditing }) => {
  const [formData, setFormData] = useState({
    Name: "",
    Number: "",
    Email: "",
    Gender: "",
    Location: "",
    //UserId: "",
  });

  // Update formData when editing a contact
  useEffect(() => {
    if (isEditing && contact) {
      setFormData({
        Name: contact.Name,
        Number: contact.Number,
        Email: contact.Email,
        Gender: contact.Gender,
        Location: contact.Location,
        // UserId: contact.UserId,
      });
    }
  }, [isEditing, contact]);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updateContact(contact.id, formData);
    } else {
      await addContact(formData);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-3">
      <FormGroup>
        <Label>Name</Label>
        <Input
          type="text"
          value={formData.Name}
          onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label>Phone</Label>
        <Input
          type="text"
          value={formData.Number}
          onChange={(e) => setFormData({ ...formData, Number: e.target.value })}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label>Email</Label>
        <Input
          type="email"
          value={formData.Email}
          onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
        />
      </FormGroup>

      {/* Gender dropdown with Male, Female, Other options */}
      <FormGroup>
        <Label>Gender</Label>
        <Input
          type="select"
          value={formData.Gender}
          onChange={(e) => setFormData({ ...formData, Gender: e.target.value })}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </Input>
      </FormGroup>

      <FormGroup>
        <Label>Location</Label>
        <Input
          type="text"
          value={formData.Location}
          onChange={(e) =>
            setFormData({ ...formData, Location: e.target.value })
          }
        />
      </FormGroup>

      {/* Centering the Submit Button */}
      <Row className="d-flex justify-content-center">
        <Col xs="auto">
          <Button color="success" type="submit">
            {isEditing ? "Update Contact" : "Add Contact"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ContactForm;
