const userModel = require("../model/userModel");

function getAll(req, res) {
  const users = userModel.getAll();
  res.status(200).send({ success: true, count: users.length, data: users });
}

function getById(req, res) {
  const user = userModel.getById(parseInt(req.params.id));
  if (!user) {
    return res.status(404).send({ success: false, message: "User not found" });
  }
  res.status(200).send({ success: true, data: user });
}

function create(req, res) {
  const { name, email, role } = req.body;
  if (!name || !email) {
    return res
      .status(400)
      .send({ success: false, message: "Name and email are required" });
  }
  const newUser = userModel.create({ name, email, role });
  res
    .status(201)
    .send({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
}

function update(req, res) {
  const id = parseInt(req.params.id);
  const { name, email, role } = req.body;
  const updatedUser = userModel.update(id, { name, email, role });
  if (!updatedUser) {
    return res.status(404).send({ success: false, message: "User not found" });
  }
  res
    .status(200)
    .send({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
}

function remove(req, res) {
  const id = parseInt(req.params.id);
  const success = userModel.remove(id);
  if (!success) {
    return res.status(404).send({ success: false, message: "User not found" });
  }
  res.status(200).send({ success: true, message: "User deleted successfully" });
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
