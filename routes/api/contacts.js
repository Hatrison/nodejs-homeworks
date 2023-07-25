const express = require("express");

const {
  getAll,
  getById,
  add,
  deleteContact,
  update,
  updateStatus,
} = require("../../controllers/contacts");

const { isValidId } = require("../../middlewares/isValidId");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", isValidId, getById);

router.post("/", express.json(), add);

router.delete("/:contactId", isValidId, deleteContact);

router.put("/:contactId", isValidId, update);

router.patch("/:contactId/favorite", isValidId, updateStatus);

module.exports = router;
