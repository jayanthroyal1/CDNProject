import {
  submitContact,
  fetchContacts,
  updateStatus,
} from "../services/contact.service.js";

import { asyncHandler } from "../utils/async-handler.js";

import { successResponse } from "../utils/api-response.js";

export const createContactController = asyncHandler(async (req, res) => {
  const contact = await submitContact(req.body);

  return successResponse(res, contact, "Message submitted", 201);
});

export const getContactsController = asyncHandler(async (req, res) => {
  const contacts = await fetchContacts();

  return successResponse(res, contacts, "Messages fetched");
});

export const updateContactStatusController = asyncHandler(async (req, res) => {
  const result = await updateStatus(req.params.id, req.body.status);

  return successResponse(res, result, "Status updated");
});
