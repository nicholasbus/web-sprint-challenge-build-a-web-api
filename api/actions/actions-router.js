// Write your "actions" router here!
const Actions = require("./actions-model");
const express = require("express");
const router = express.Router();
const {
  validateActionId,
  validateActionBody,
} = require("../middlewares/middleware");

router.get("/", async (req, res) => {
  try {
    const actions = await Actions.get();
    res.status(200).json(actions);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

router.get("/:id", validateActionId, (req, res) => {
  res.status(200).json(req.action);
});

router.post("/", validateActionBody, async (req, res) => {
  try {
    const newAction = await Actions.insert(req.body);
    res.status(201).json(newAction);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

router.put("/:id", validateActionId, validateActionBody, async (req, res) => {
  const { id } = req.params;
  try {
    const modifiedAction = await Actions.update(id, req.body);
    res.status(201).json(modifiedAction);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

router.delete("/:id", validateActionId, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAction = await Actions.remove(id);
    res.status(201).json(deletedAction);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

module.exports = router;
