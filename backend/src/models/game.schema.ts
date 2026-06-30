import { z } from 'zod';

export const GameSchema = z.object({
     title: z.string().describe("Game Title"),
     developer: z.string().describe("Game developer"),
     platforms: z.array(z.string()).describe("Platforms like PC, PS5, Xbox, Switch"),
     year: z.number().describe("Release year"),
     genre: z.array(z.string()).describe("List of genres"),
     reason: z.string().describe("Why this matches the user's mood and preference"),
     rating: z.number().min(1).max(10).describe("Metacritic style rating out of 10")
});

export const GameRecommendationsSchema = z.object({
     games: z.array(GameSchema).describe("List of recommended games")
});

export type Game = z.infer<typeof GameSchema>;
export type GameRecommendation = z.infer<typeof GameRecommendationsSchema>;
