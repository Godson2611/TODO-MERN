/** @format */

import express from "express";
import UserControllerjs from "../controllers/User.controller.js";
import Auth from "../common/Auth.js";
const router = express.Router();

router.get("/", Auth.validate, Auth.adminGaurd, UserControllerjs.getUsers);
router.get("/:id", UserControllerjs.getUserById);
router.post("/", UserControllerjs.create);
router.put("/:id", UserControllerjs.editUserById);
router.delete("/:id", UserControllerjs.deleteUserById);
router.post("/login", UserControllerjs.login);

export default router;
