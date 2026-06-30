import { Request, Response } from 'express';
import { getBookRecommendations } from '../services/book.service.js';

export async function recommendedBooks(req: Request, res: Response) {
     try {
          const {
               userPrompt = "Suggest cozy fantasy books",
               genre = "Fantasy",
               mood = "cozy",
               count = 5
          } = req.body;

          const result = await getBookRecommendations({
               userPrompt,
               genre,
               mood,
               count: Number(count)
          });

          res.json(result);
     } catch (err: any) {
          console.error(err.message);
          res.status(500).json({
               message: "Error from recommendedBooks controller",
               error: err.message
          });
     }
}
