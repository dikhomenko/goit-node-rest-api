import Contact from "../db/sequelize/Contact.js";

export async function listContacts() {
  return await Contact.findAll();
}

export async function getContactById(contactId) {
  return await Contact.findByPk(contactId);
}

export async function addContact(name, email, phone) {
  const id = Math.random().toString(36).slice(2, 12) + Date.now();
  const newContact = await Contact.create({ id, name, email, phone });
  return newContact;
}

export async function updateContact(id, data) {
  const contact = await Contact.findByPk(id);
  if (!contact) return null;
  await contact.update(data);
  return contact;
}

export async function removeContact(id) {
  const contact = await Contact.findByPk(id);
  if (!contact) return null;
  await contact.destroy();
  return contact;
}