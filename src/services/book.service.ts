import { BookModel } from "../models/book.model";
import { saveSearchResult, getCachedSearchResult } from "./caching.service";

export const addBook = async (name: string, author: string, publishYear: number, price: number) => {
  const book = new BookModel({ name, author, publishYear, price });
  return await book.save();
};

export const getBook = async (id: string) => {
  return await BookModel.findById(id);
};

export const getAllBooks = async () => {
  return await BookModel.find();
};

export const removeBook = async (id: string) => {
  const result = await BookModel.findByIdAndDelete(id);
  return result ? true : false;
};

export const updateBook = async (id: string, updates: Partial<{ name: string; author: string; publishYear: number; price: number }>) => {
  return await BookModel.findByIdAndUpdate(id, updates, { new: true });
};

export const filterBooks = async (minPrice?: number, maxPrice?: number, minYear?: number, maxYear?: number, name?: string, author?: string) => {
  const queryKey = JSON.stringify({ minPrice, maxPrice, minYear, maxYear, name, author });

  const cachedResult = await getCachedSearchResult(queryKey);
  if (cachedResult) {
    console.log("Returning cached result");
    return cachedResult;
  }

  const query: any = {};

  if (minPrice !== undefined) query.price = { ...query.price, $gte: minPrice };
  if (maxPrice !== undefined) query.price = { ...query.price, $lte: maxPrice };
  if (minYear !== undefined) query.publishYear = { ...query.publishYear, $gte: minYear };
  if (maxYear !== undefined) query.publishYear = { ...query.publishYear, $lte: maxYear };
  if (name) query.name = { $regex: new RegExp(name, "i") };
  if (author) query.author = { $regex: new RegExp(author, "i") };

  const books = await BookModel.find(query);
  await saveSearchResult(queryKey, books);

  return books;
};
