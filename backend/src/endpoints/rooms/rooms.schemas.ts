import * as mongoose from "mongoose";

const PicturesSchema = new mongoose.Schema({
  base64: { type: String, required: true },
  caption: { type: String, required: false },
});

export const RoomsSchema = new mongoose.Schema({
  order: { type: Number, required: true },
  menu: { type: String, required: true },
  title: { type: String, required: true },
  paragraphs: { type: Array, required: true },
  link: { type: String, required: true },
  pics: { type: [PicturesSchema], required: true },
  updatedAt: { type: Date, default: Date.now },
});
