/** @format */

import mongoose from "./index.modle.js";

const validateEmail = (e) => {
  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(e);
};

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: validateEmail,
    },
    password: { type: String, required: [true, "Password is required"] },
    status: { type: Boolean, default: true },
    role: { type: String, default: "customer" },
    createdAt: { type: Date, default: Date.now() },
    todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }],
  },
  {
    collection: "users",
    versionKey: false,
  }
);

const userModel = mongoose.model("User", userSchema);
export default userModel;
