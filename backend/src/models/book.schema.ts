import { z } from 'zod';

export const BookSchema = z.object({
     title: z.string().describe("Book Title"),
     author: z.string().describe("Author of the book"),
     year: z.number().describe("Publication year"),
     genre: z.array(z.string()).describe("List of genres/categories"),
     reason: z.string().describe("Why this book matches the user's mood and preference"),
     rating: z.number().min(1).max(10).describe("Goodreads style rating out of 10")
});

export const BookRecommendationsSchema = z.object({
     books: z.array(BookSchema).describe("List of recommended books")
});

export type Book = z.infer<typeof BookSchema>;
export type BookRecommendation = z.infer<typeof BookRecommendationsSchema>;
