const UserService = require("../service/userService");

async function getAll(req, res, next) {
  try {
    const role = req.query.role;
    const { statusCode, message } = await UserService.getAll(role);
    res.status(statusCode).send(message);
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const { statusCode, message } = await UserService.getById(req.params.id);
    res.status(statusCode).send(message);
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const { name, email, role } = req.body;
    const { statusCode, message } = await UserService.create({
      name,
      email,
      role,
    });
    res.status(statusCode).send(message);
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const id = req.params.id;
    const { statusCode, message } = await UserService.update(id, req.body);
    res.status(statusCode).send(message);
  } catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {
  try {
    const id = req.params.id;
    const { statusCode, message } = await UserService.remove(id);
    res.status(statusCode).send(message);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
