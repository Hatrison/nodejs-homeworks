const { listContacts } = require("../../models/contacts");

const getAll = async (req, res, next) => {
  res.json(await listContacts());
};

module.exports = getAll;
