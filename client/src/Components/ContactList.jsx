import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import ContactCard from "./ContactCard";

const ContactList = ({ contacts }) => {
  // Ensure contacts.data exists to prevent errors
  if (!contacts || !contacts.data || contacts.data.length === 0) {
    return <p>No contacts available.</p>;
  }

  // Group contacts alphabetically by the first letter of their name
  const groupedContacts = contacts.data.reduce((acc, contact) => {
    if (contact.Name) {
      const letter = contact.Name.charAt(0).toUpperCase();
      if (!acc[letter]) acc[letter] = [];
      acc[letter].push(contact);
    }
    return acc;
  }, {});

  return (
    <div>
      {Object.keys(groupedContacts)
        .sort()
        .map((letter) => (
          <div key={letter} className="mb-3">
            <h5>{letter}</h5>
            <ListGroup>
              {groupedContacts[letter].map((contact) => (
                <ListGroupItem key={contact.id}>
                  <ContactCard contact={contact} />
                </ListGroupItem>
              ))}
            </ListGroup>
          </div>
        ))}
    </div>
  );
};

export default ContactList;
