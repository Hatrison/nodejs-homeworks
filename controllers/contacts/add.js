const { addContact } = require("../../models/contacts");
const {
  schemas: { contactSchemaForAdd },
} = require("../../schemas/contact.js");

const add = async (req, res, next) => {
  const response = contactSchemaForAdd.validate(req.body);

  if (typeof response.error !== "undefined") {
    res.status(400).json({ message: "missing required name field" });
  } else {
    const { _id: owner } = req.user;
    res.status(201).json(await addContact(req.body, owner));
  }
};

module.exports = add;
