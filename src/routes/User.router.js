/** @format */

import express from "express";
import UserController from "../controllers/User.controller.js";
import Auth from "../common/Auth.js";

const router = express.Router();

router.post("/signup", UserController.signup);
router.post("/signin", UserController.signin);
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.put("/edit/:id", UserController.updateUserById);
router.delete("/delete/:id", UserController.deleteUserById);

export default router;
