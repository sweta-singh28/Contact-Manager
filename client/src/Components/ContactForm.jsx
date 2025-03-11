import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { addContact, updateContact } from "../api/contacts";

const ContactForm = ({ contact, isEditing }) => {
  const [formData, setFormData] = useState({
    Name: "",
    Number: "",
    Email: "",
    Gender: "",
    Location: "",
    UserId: "",
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
        UserId: contact.UserId,
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

      <FormGroup>
        <Label>Gender</Label>
        <Input
          type="text"
          value={formData.Gender}
          onChange={(e) => setFormData({ ...formData, Gender: e.target.value })}
        />
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

      <FormGroup>
        <Label>UserId</Label>
        <Input
          type="text"
          value={formData.UserId}
          onChange={(e) => setFormData({ ...formData, UserId: e.target.value })}
        />
      </FormGroup>

      <Button color="success" type="submit">
        {isEditing ? "Update Contact" : "Add Contact"}
      </Button>
    </Form>
  );
};

export default ContactForm;
