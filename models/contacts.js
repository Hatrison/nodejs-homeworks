const { Contact } = require("../schemas/contact.js");

const listContacts = async (skip, limit, favorite) => {
  const filter = favorite ? { favorite } : {};
  const contacts = await Contact.find(filter, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email subscription");
  return contacts;
};

const getContactById = async (contactId) => {
  const result = await Contact.findById(contactId);
  return result;
};

const removeContact = async (contactId) => {
  const result = await Contact.findByIdAndRemove(contactId);
  return result;
};

const addContact = async (body, owner) => {
  const result = await Contact.create({ ...body, owner });
  return result;
};

const updateContact = async (contactId, body) => {
  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  return result;
};

const updateStatusContact = async (contactId, body) => {
  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
