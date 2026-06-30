import { z } from 'zod';

export const MovieSchema = z.object({
     title: z.string().describe("Movie Title"),
     year: z.number().describe("Release year"),
     genre: z.array(z.string()).describe("List of genres"),
     cast: z.array(z.string()).describe("List of main cast"),
     reason: z.string().describe("Why this matches the user's mood and preference"),
     rating: z.number().min(1).max(10).describe("IMDB style rating out of 10")
});

export const RecommendationsSchema = z.object({
     movies: z.array(MovieSchema).describe("List of recommended movies")
});

export type Movie = z.infer<typeof MovieSchema>;
export type Recommendation = z.infer<typeof RecommendationsSchema>;
