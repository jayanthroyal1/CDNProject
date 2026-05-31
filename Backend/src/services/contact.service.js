import AppError from "../utils/app-error.js";

import {
  createContact,
  getContacts,
  getContactById,
  updateContactStatus,
} from "../repositories/contact.repository.js";

export const submitContact = async (payload) => {
  return createContact(payload);
};

export const fetchContacts = async () => {
  return getContacts();
};

export const updateStatus = async (id, status) => {
  const contact = await getContactById(id);

  if (!contact) {
    throw new AppError("Contact not found", 404);
  }

  return updateContactStatus(id, status);
};
