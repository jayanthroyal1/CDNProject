import Contact from "../models/contact.model.js";

export const createContact = async (payload) => {
  return Contact.create(payload);
};

export const getContacts = async () => {
  return Contact.find().sort({
    createdAt: -1,
  });
};

export const getContactById = async (id) => {
  return Contact.findById(id);
};

export const updateContactStatus = async (id, status) => {
  return Contact.findByIdAndUpdate(
    id,
    { status },
    {
      new: true,
    },
  );
};
