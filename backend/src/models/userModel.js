import { model, Schema } from "mongoose";
const Userschema = new Schema(
  {
    name: { type: String, required: true },
    nickname: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  {
    timestamps: { createdAt: "create_at", updatedAt: "updated_at" },
    versionKey: false,
  }
);
export const userModel = model("newuser", Userschema, "newuser");
