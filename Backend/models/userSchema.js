const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["member", "admin"],
    default: "member",
  },
  dateCreated: { type: Date, default: Date.now },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (eneterPassword) {
  return await bcrypt.compare(eneterPassword, this.password);
};
userSchema.methods.matchRole = async function (receivedRole) {
  if (this.role === "admin" && receivedRole) return true;
  if (this.role === "member" && !receivedRole) return true;
  return false;
};

module.exports = mongoose.model("User", userSchema);
