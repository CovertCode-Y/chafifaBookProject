import express from "express";
import { addBookHandler, getBookHandler, getAllBooksHandler, removeBookHandler, updateBookHandler, filterBooksHandler } from "../controllers/book.controller";

const router = express.Router();

router.get("/books/filter", filterBooksHandler);
router.post("/books", addBookHandler);
router.get("/books/:id", getBookHandler);
router.get("/books", getAllBooksHandler);
router.delete("/books/:id", removeBookHandler);
router.put("/books/:id", updateBookHandler);

export default router;
