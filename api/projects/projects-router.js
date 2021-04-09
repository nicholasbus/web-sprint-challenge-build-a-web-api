// Write your "projects" router here!
const Projects = require("./projects-model");
const express = require("express");
const router = express.Router();
const {
  validateProjectId,
  validateProjectBody,
} = require("../middlewares/middleware");

router.get("/", async (req, res) => {
  try {
    const projects = await Projects.get();
    res.status(200).json(projects);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

router.get("/:id", validateProjectId, async (req, res) => {
  res.status(200).json(req.project);
});

router.post("/", validateProjectBody, async (req, res) => {
  try {
    const newProject = await Projects.insert(req.body);
    res.status(200).json(newProject);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

router.put("/:id", validateProjectId, validateProjectBody, async (req, res) => {
  const { id } = req.params;
  try {
    const modifiedProject = await Projects.update(id, req.body);
    res.status(201).json(modifiedProject);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

router.delete("/:id", validateProjectId, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProject = await Projects.remove(id);
    res.status(201).json(deletedProject);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

router.get("/:id/actions", validateProjectId, async (req, res) => {
  const { id } = req.params;
  try {
    const projectActions = await Projects.getProjectActions(id);
    res.status(200).json(projectActions);
  } catch (e) {
    res.status(500).json(e.message);
  }
});
module.exports = router;
