import { Request, Response } from 'express';
import { getGameRecommendations } from '../services/game.service.js';

export async function recommendedGames(req: Request, res: Response) {
     try {
          const {
               userPrompt = "Suggest relaxing indie adventure games",
               genre = "Adventure",
               mood = "relaxed",
               count = 5
          } = req.body;

          const result = await getGameRecommendations({
               userPrompt,
               genre,
               mood,
               count: Number(count)
          });

          res.json(result);
     } catch (err: any) {
          console.error(err.message);
          res.status(500).json({
               message: "Error from recommendedGames controller",
               error: err.message
          });
     }
}
