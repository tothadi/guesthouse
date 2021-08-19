import * as mongoose from "mongoose";

export const RoomsSchema = new mongoose.Schema({
  order: { type: Number, required: true },
  menu: { type: String, required: true },
  title: { type: String, required: true },
  paragraphs: { type: Array, required: true },
  link: { type: String, required: true },
  pics: { type: Array, required: true },
  updatedAt: { type: Date, default: Date.now },
});
