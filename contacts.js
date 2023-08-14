const fs = require("fs/promises");
const path = require("path");
const nanoid = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((item) => item.id === contactId);
    return contact;
  } catch (error) {
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const updatedContacts = contacts.filter((item) => item.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  } catch (error) {
    throw error;
  }
}

async function addContact({ name, email, phone }) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
