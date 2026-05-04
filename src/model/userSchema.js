const { default: mongoose } = require("mongoose");

const usersSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  createdAt: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

const User = mongoose.model("User", usersSchema);
module.exports = User;
