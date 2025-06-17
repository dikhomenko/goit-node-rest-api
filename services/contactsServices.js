import Contact from "../db/sequelize/Contact.js";

export async function listContacts(owner) {
  return await Contact.findAll({ where: { owner } });
}

export async function getContactById(contactId, owner) {
  return await Contact.findOne({ where: { id: contactId, owner } });
}

export async function addContact(name, email, phone, owner) {
  const id = Math.random().toString(36).slice(2, 12) + Date.now();
  const newContact = await Contact.create({ id, name, email, phone, owner });
  return newContact;
}

export async function updateContact(id, data, owner) {
  const contact = await Contact.findOne({ where: { id, owner } });
  if (!contact) return null;
  await contact.update(data);
  return contact;
}

export async function removeContact(id, owner) {
  const contact = await Contact.findOne({ where: { id, owner } });
  if (!contact) return null;
  await contact.destroy();
  return contact;
}