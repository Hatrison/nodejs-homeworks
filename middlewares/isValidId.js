const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next({ status: 400, message: "Invalid id" });
  }
  next();
};

module.exports = { isValidId };
