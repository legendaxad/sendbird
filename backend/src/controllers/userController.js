import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/secret.js";
import { userModel } from "../models/userModel.js";

export class AuthController {
  static login = async (req, res) => {
    try {
      const { name, nickname } = req.body;

      const newUser = await userModel.create({ name, nickname });

      const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.status(201).json({
        message: "User created successfully",
        user: {
          id: newUser._id,
          name: newUser.name,

          nickname: newUser.nickname,
        },
        token,
      });
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  };

  static me = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      res.status(200).json({ data: req.user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };
}
