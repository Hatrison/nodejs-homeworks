const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../models/contacts");

const {
  schemas: { contactSchemaForAdd, contactSchemaForPut, contactSchemaForPatch },
} = require("../../schemas/contact.js");

const { isValidId } = require("../../middlewares/isValidId");

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.json(await listContacts());
});

router.get("/:contactId", isValidId, async (req, res, next) => {
  const result = await getContactById(req.params.contactId);

  if (result === null) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.json(result);
  }
});

router.post("/", express.json(), async (req, res, next) => {
  const response = contactSchemaForAdd.validate(req.body);

  if (typeof response.error !== "undefined") {
    res.status(400).json({ message: "missing required name field" });
  } else {
    res.status(201).json(await addContact(req.body));
  }
});

router.delete("/:contactId", isValidId, async (req, res, next) => {
  const result = await removeContact(req.params.contactId);

  if (result === null) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.status(200).json({ message: "contact deleted" });
  }
});

router.put("/:contactId", isValidId, async (req, res, next) => {
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
});

router.patch("/:contactId/favorite", isValidId, async (req, res, next) => {
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
});

module.exports = router;
