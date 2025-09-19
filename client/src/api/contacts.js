import axios from "axios";

const API_URL = "https://contact-manager-yvwr.onrender.com/contacts"; // Middleware API Base URL

// Fetch all contacts
export const getContacts = async (email) => {
  try {
    const response = await axios.get(API_URL, {
      params: { email }, // Send email as a query parameter
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return [];
  }
};



// Add a new contact
export const addContact = async (contact) => {
  try {
    const response = await axios.post(API_URL, contact);
    return response.data; // Return the newly created contact
  } catch (error) {
    console.error("Error adding contact:", error);
  }
};

// Fetch a specific contact by ID
export const getContactById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching contact:", error);
  }
};

// Update a contact
export const updateContact = async (id, updatedData) => {
  try {
    await axios.put(`${API_URL}/${id}`, updatedData);
  } catch (error) {
    console.error("Error updating contact:", error);
  }
};

// Delete a contact
export const deleteContact = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting contact:", error);
  }
};
