const { updateStatusContact } = require("../../models/contacts");
const {
  schemas: { contactSchemaForPatch },
} = require("../../schemas/contact.js");

const updateStatus = async (req, res, next) => {
  const response = contactSchemaForPatch.validate(req.body);

  if (typeof response.error !== "undefined") {
    res.status(400).json({ message: "missing field favorite" });
  } else {
    const result = await updateStatusContact(req.params.contactId, req.body);

    if (result === null) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.status(200).json(result);
    }
  }
};

module.exports = updateStatus;
