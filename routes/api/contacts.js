const express = require("express");

const {
  getAll,
  getById,
  add,
  deleteContact,
  update,
  updateStatus,
} = require("../../controllers/contacts");

const { isValidId, authorization } = require("../../middlewares");

const router = express.Router();

router.get("/", authorization, getAll);

router.get("/:contactId", authorization, isValidId, getById);

router.post("/", authorization, express.json(), add);

router.delete("/:contactId", authorization, isValidId, deleteContact);

router.put("/:contactId", authorization, isValidId, update);

router.patch("/:contactId/favorite", authorization, isValidId, updateStatus);

module.exports = router;
