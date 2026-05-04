require("dotenv").config();
const connectDB = require("../../config/db");
const User = require("../model/userSchema");

const users = [
  {
    id: 1,
    name: "Admin",
    email: "admin@localhost.com",
    role: "admin",
  },
  {
    id: 2,
    name: "Enzo",
    email: "enzo@localhost.com",
    role: "user",
  },
  {
    id: 3,
    name: "John Doe",
    email: "john.doe@localhost.com",
    role: "user",
  },
];

const seedUsers = async () => {
  await connectDB();

  if ((await User.countDocuments()) === 0) {
    await User.insertMany(users)
      .catch((err) => {
        console.error("Error seeding users:", err);
        process.exit(1);
      })
      .then(() => {
        console.log("Users seeded successfully");
        process.exit(0);
      });
  } else {
    console.log("Db already has users");
    process.exit(0);
  }
};

seedUsers();
