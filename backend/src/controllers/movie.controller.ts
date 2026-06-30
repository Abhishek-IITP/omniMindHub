import { Request, Response } from 'express';
import { getMovieRecommendations } from '../services/movie.service.js';

export async function recommendedMovies(req: Request, res: Response) {
     try {
          const {
               userPrompt = "Suggest movies for a horror party",
               genre = "Horror",
               mood = "scary",
               count = 5
          } = req.body;

          const result = await getMovieRecommendations({
               userPrompt,
               genre,
               mood,
               count: Number(count)
          });

          res.json(result);
     } catch (err: any) {
          console.error(err.message);
          res.status(500).json({
               message: "Error from recommendedMovies controller",
               error: err.message
          });
     }
}
