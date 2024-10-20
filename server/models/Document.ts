import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

//creating schema
const docSchema = new mongoose.Schema({
  docname: { type: String, required: true },
  data: { type: Object, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  tags: { type: [String], default: [] },
});

const Document = mongoose.model("Document", docSchema);

export default Document;
