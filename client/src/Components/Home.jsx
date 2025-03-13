import React, { useState, useEffect } from "react";
import { Container, Input, Button } from "reactstrap";
import ContactList from "./ContactList";
import { getContacts } from "../api/contacts";
import "./../css/home.css"
const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {// arrow function ()=>
    const fetchContacts = async () => {
      try {
        const response = await getContacts();
        
        if (response) {
          setContacts(response);
           // Use response.data directly
        } else {
          setContacts([]);
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setContacts([]);
      }
    };
    fetchContacts();
  }, []);//dependency array []
  console.log(contacts);
  const filteredContacts = contacts.filter((contact) =>
    contact.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Container className="mt-4" id="container">
      <h2 className="text-center mb-3">Contact Manager</h2>
      <Input
        type="text"
        placeholder="Search contacts..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ContactList contacts={filteredContacts} />
      <Button
        color="primary"
        className="rounded-circle position-fixed bottom-0 end-0 m-4"
        style={{ width: "50px", height: "50px" }}
      >
        +
      </Button>
    </Container>
  );
};

export default Home;
