/** @format */

import userModel from "../models/User.model.js";
import Auth from "../common/Auth.js";

const getAllUsers = async (req, res) => {
  try {
    let users = await userModel.find({}, { password: 0 });
    res.status(200).send({
      message: "User Data Fetched Successfully",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    let user = await userModel.findOne({ _id: req.params.id }, { password: 0 });
    res.status(200).send({
      message: "User Fetched Successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const signup = async (req, res) => {
  try {
    let user = await userModel.findOne(
      { email: req.body.email },
      { password: 0 }
    );
    if (!user) {
      req.body.password = await Auth.hashPassword(req.body.password);
      await userModel.create(req.body);
      res.status(201).send({
        message: "User Created Successfully",
      });
    } else {
      res
        .status(400)
        .send({ message: `User with ${req.body.email} already exists` });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const signin = async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.body.email });
    if (user) {
      let hashCompare = await Auth.hashCompare(
        req.body.password,
        user.password
      );
      if (hashCompare) {
        let token = await Auth.createToken({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        });
        res.status(200).send({
          message: "Login Successfull",
          token,
        });
      } else {
        res.status(400).send({
          message: `Invalid Password`,
        });
      }
    } else {
      res.status(400).send({
        message: `Account with ${req.body.email} does not exists!`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const updateUserById = async (req, res) => {
  try {
    let user = await userModel.findOne({ _id: req.params.id });
    if (user) {
      let { name, email, password, status, role } = req.body;
      user.name = name ? name : user.name;
      user.email = email ? email : user.email;
      user.password = password ? password : user.password;
      user.status = status ? status : user.status;
      user.role = role ? role : user.role;

      await user.save();

      res.status(200).send({
        message: "User Data Saved",
      });
    } else {
      res.status(400).send({ message: "Invalid User" });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const deleteUserById = async (req, res) => {
  try {
    let user = await userModel.findOne({ _id: req.params.id });
    if (user) {
      await userModel.deleteOne({ _id: req.params.id });
      res.status(200).send({ message: "User Deleted Successfully" });
    } else {
      res.status(400).send({ message: "Invalid User" });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export default {
  getAllUsers,
  signup,
  getUserById,
  updateUserById,
  deleteUserById,
  signin,
};
