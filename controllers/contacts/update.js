const { updateContact } = require("../../models/contacts");
const {
  schemas: { contactSchemaForPut },
} = require("../../schemas/contact.js");

const update = async (req, res, next) => {
  const response = contactSchemaForPut.validate(req.body);

  if (typeof response.error !== "undefined") {
    res.status(400).json({ message: "missing fields" });
  } else {
    const result = await updateContact(req.params.contactId, req.body);

    if (result === null) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.status(200).json(result);
    }
  }
};

module.exports = update;
