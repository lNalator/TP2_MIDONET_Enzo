const { isValidObjectId } = require("mongoose");
const User = require("../model/userSchema");

async function getAll(role) {
  const users = await User.find(role ? { role } : {}).exec();
  if (!users || users.length === 0) {
    const error = new Error("No users found");
    error.statusCode = 404;
    throw error;
  }

  return {
    statusCode: 200,
    message: { success: true, count: users.length, data: users },
  };
}

async function getById(id) {
  if (!isValidObjectId(id)) {
    const error = new Error("Invalid user ID");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findById(id);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  return { statusCode: 200, message: { success: true, data: user } };
}

async function create(userData) {
  const { name, email } = userData;
  if (!name || !email) {
    const error = new Error("Name and email are required");
    error.statusCode = 400;
    throw error;
  }

  const newUser = new User(userData);
  await newUser.save();
  return {
    statusCode: 201,
    message: {
      success: true,
      message: "User created successfully",
      data: newUser,
    },
  };
}

async function update(id, userData) {
  if (!isValidObjectId(id)) {
    const error = new Error("Invalid user ID");
    error.statusCode = 400;
    throw error;
  }
  const updatedUser = await User.findByIdAndUpdate(id, userData, {
    returnDocument: "after",
    runValidators: true,
  });
  if (!updatedUser) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  return {
    statusCode: 200,
    message: {
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    },
  };
}

async function remove(id) {
  if (!isValidObjectId(id)) {
    const error = new Error("Invalid user ID");
    error.statusCode = 400;
    throw error;
  }
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  return {
    statusCode: 200,
    message: {
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    },
  };
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
