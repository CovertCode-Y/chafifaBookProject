import { Request, Response } from "express";
import { addBook, getBook, getAllBooks, removeBook, updateBook, filterBooks } from "../services/book.service";

export const addBookHandler = async (req: Request, res: Response) => {
  try {
    const { name, author, publishYear, price } = req.body;
    const book = await addBook(name, author, publishYear, price);
    res.status(201).json({ message: "Book added successfully", book });
  } catch (error) {
    res.status(400).json({ message: "Failed to add book" });
  }
};

export const getBookHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = await getBook(id);
  if (!book) {
    res.status(404).json({ message: "Book not found" });
    return;
  }
  res.json(book);
};

export const getAllBooksHandler = async (_req: Request, res: Response) => {
  const books = await getAllBooks();
  res.json(books);
};

export const removeBookHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const success = await removeBook(id);
  if (!success) {
    res.status(404).json({ message: "Book not found" });
    return;
  }
  res.json({ message: "Book removed successfully" });
};

export const updateBookHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedBook = await updateBook(id, updates);
    if (!updatedBook) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    res.json({ message: "Book updated successfully", book: updatedBook });
  } catch {
    res.status(400).json({ message: "Failed to update book" });
  }
};

export const filterBooksHandler = async (req: Request, res: Response) => {
  try {
    const minPrice = req.query.minPrice ? parseFloat(req.query.minPrice as string) : undefined;
    const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined;
    const minYear = req.query.minYear ? parseInt(req.query.minYear as string) : undefined;
    const maxYear = req.query.maxYear ? parseInt(req.query.maxYear as string) : undefined;
    const name = req.query.name ? req.query.name.toString() : undefined;
    const author = req.query.author ? req.query.author.toString() : undefined;

    const books = await filterBooks(minPrice, maxPrice, minYear, maxYear, name, author);
    res.json(books);
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};
