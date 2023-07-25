const { listContacts } = require("../../models/contacts");

const getAll = async (req, res, next) => {
  const { page = 1, limit = 10, favorite = false } = req.query;
  const skip = (page - 1) * limit;
  res.json(await listContacts(skip, limit, favorite));
};

module.exports = getAll;
