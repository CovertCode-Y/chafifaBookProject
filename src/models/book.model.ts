import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  publishYear: { type: Number, required: true },
  price: { type: Number, required: true }
});

export const BookModel = mongoose.model("Book", bookSchema);
