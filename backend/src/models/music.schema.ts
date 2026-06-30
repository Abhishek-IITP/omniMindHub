import { z } from 'zod';

export const MusicSchema = z.object({
     title: z.string().describe("Song or Album Title"),
     artist: z.string().describe("Artist or Band name"),
     year: z.number().describe("Release year"),
     genre: z.array(z.string()).describe("List of genres/styles"),
     reason: z.string().describe("Why this matches the user's mood and preference"),
     rating: z.number().min(1).max(10).describe("Rating or popularity out of 10")
});

export const MusicRecommendationsSchema = z.object({
     music: z.array(MusicSchema).describe("List of recommended music items")
});

export type Music = z.infer<typeof MusicSchema>;
export type MusicRecommendation = z.infer<typeof MusicRecommendationsSchema>;
