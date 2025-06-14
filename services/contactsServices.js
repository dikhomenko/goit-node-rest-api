import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname, "../db", "contacts.json");

export async function listContacts() {
  const data = await readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

async function writeContacts(contacts) {
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find(c => String(c.id) === String(contactId)) || null;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex(c => String(c.id) === String(contactId));
  if (idx === -1) return null;
  const [removed] = contacts.splice(idx, 1);
  await writeContacts(contacts);
  return removed;
}

export async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const id = Math.random().toString(36).slice(2, 12) + Date.now();
  const newContact = { id, name, email, phone };
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
}

export async function updateContact(id, data) {
  const contacts = await listContacts();
  const idx = contacts.findIndex(c => String(c.id) === String(id));
  if (idx === -1) return null;
  const filteredData = Object.fromEntries(
    Object.entries(data).filter(([_, v]) => v !== undefined)
  );
  contacts[idx] = { ...contacts[idx], ...filteredData };
  await writeContacts(contacts);
  return contacts[idx];
}