const users = require("../data/users");

function getAll() {
  return users;
}

function getById(id) {
  return users.find((u) => u.id === id);
}

function create(data) {
  const newUser = {
    id: users.length + 1,
    name: data.name,
    email: data.email,
    role: data.role || "user",
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  return newUser;
}

function update(id, data) {
  const existingUser = users.find((u) => u.id === id);
  if (!existingUser) {
    return null;
  }
  existingUser.name = data.name || existingUser.name;
  existingUser.email = data.email || existingUser.email;
  existingUser.role = data.role || existingUser.role;
  return existingUser;
}

function remove(id) {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) {
    return false;
  }
  users.splice(index, 1);
  return true;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
