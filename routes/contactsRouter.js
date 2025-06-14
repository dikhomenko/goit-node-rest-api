import express from "express";
import {
  getAllContactsWrapper as getAllContacts,
  getOneContactWrapper as getOneContact,
  deleteContactWrapper as deleteContact,
  createContactWrapper as createContact,
  updateContactWrapper as updateContact,
  updateFavoriteStatusContactWrapper as updateFavoriteStatus 
} from "../controllers/contactsControllers.js";
import validateBody from "../Helpers/validateBody.js";
import { createContactSchema, updateContactSchema, updateFavoriteSchema } from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", validateBody(updateContactSchema), updateContact);

contactsRouter.patch(
  "/:contactId/favorite", 
  validateBody(updateFavoriteSchema),
  updateFavoriteStatus
);
export default contactsRouter;
