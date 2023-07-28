const { removeContact } = require("../../models/contacts");

const deleteContact = async (req, res, next) => {
  const result = await removeContact(req.params.contactId);

  if (result === null) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.status(200).json({ message: "contact deleted" });
  }
};

module.exports = deleteContact;
