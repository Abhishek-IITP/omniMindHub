import { Request, Response } from 'express';
import { getMusicRecommendations } from '../services/music.service.js';

export async function recommendedMusic(req: Request, res: Response) {
     try {
          const {
               userPrompt = "Suggest synthwave tracks for coding",
               genre = "Synthwave",
               mood = "focused",
               count = 5
          } = req.body;

          const result = await getMusicRecommendations({
               userPrompt,
               genre,
               mood,
               count: Number(count)
          });

          res.json(result);
     } catch (err: any) {
          console.error(err.message);
          res.status(500).json({
               message: "Error from recommendedMusic controller",
               error: err.message
          });
     }
}
