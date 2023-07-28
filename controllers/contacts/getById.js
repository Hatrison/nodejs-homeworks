const { getContactById } = require("../../models/contacts");

const getById = async (req, res, next) => {
  const result = await getContactById(req.params.contactId);

  if (result === null) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.json(result);
  }
};

module.exports = getById;
