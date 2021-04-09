const Actions = require("../actions/actions-model");
const Projects = require("../projects/projects-model");

const validateProjectId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const project = await Projects.get(id);
    if (!project) {
      res
        .status(404)
        .json({ message: `Project with id ${id} could not be found` });
    } else {
      req.project = project;
      next();
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
};

const validateActionId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const action = await Actions.get(id);
    if (!action) {
      res
        .status(404)
        .json({ message: `Action with id ${id} could not be found` });
    } else {
      req.action = action;
      next();
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
};

const validateActionBody = (req, res, next) => {
  if (!req.body.notes || !req.body.description) {
    res.status(400).json({ message: "Notes and Description required" });
  } else {
    next();
  }
};

const validateProjectBody = (req, res, next) => {
  if (!req.body.name || !req.body.description) {
    res.status(400).json({ message: "Name and Description required" });
  } else {
    next();
  }
};

module.exports = {
  validateProjectBody,
  validateActionBody,
  validateActionId,
  validateProjectId,
};
