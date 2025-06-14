import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import controllerWrapper from "../helpers/controllerWrapper.js";

const getAllContacts = async (req, res) => {
  const contacts = await contactsService.listContacts();
  res.json(contacts);
};

const getOneContact = async (req, res) => {
  const contact = await contactsService.getContactById(req.params.id);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.json(contact);
};

const deleteContact = async (req, res) => {
  const removed = await contactsService.removeContact(req.params.id);
  if (!removed) {
    throw HttpError(404, "Not found");
  }
  res.json(removed);
};

const createContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const newContact = await contactsService.addContact(name, email, phone);
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const updated = await contactsService.updateContact(req.params.id, { name, email, phone });
  if (!updated) {
    throw HttpError(404, "Not found");
  }
  res.json(updated);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const updated = await contactsService.updateContact(contactId, req.body);
  if (!updated) {
    throw HttpError(404, "Not found");
  }
  res.json(updated);
};

export const getAllContactsWrapper = controllerWrapper(getAllContacts);
export const getOneContactWrapper = controllerWrapper(getOneContact);
export const deleteContactWrapper = controllerWrapper(deleteContact);
export const createContactWrapper = controllerWrapper(createContact);
export const updateContactWrapper = controllerWrapper(updateContact);
export const updateFavoriteStatusContactWrapper = controllerWrapper(updateStatusContact);