import "dotenv/config";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { MusicRecommendationsSchema } from "../models/music.schema.js";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: process.env.GEMINI_API_KEY!,
  temperature: 0.3,
});

const promptTemplate = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are a music recommendation expert, DJ, and musicologist.
Return high-quality recommendations based on:
- user's request
- genre
- mood
- count

Every track/album should feel intentional.
Do not recommend only the most obvious titles every time.`,
  ],
  [
    "human",
    `User request: {userPrompt}

Preferences:
- Genre: {genre}
- Mood: {mood}
- Number of items: {count}`,
  ],
]);

const structureModel = model.withStructuredOutput(MusicRecommendationsSchema);

export async function getMusicRecommendations(input: {
  userPrompt: string;
  genre: string;
  mood: string;
  count: number;
}) {
  const chain = promptTemplate.pipe(structureModel);
  const result = await chain.invoke({
    userPrompt: input.userPrompt,
    genre: input.genre,
    mood: input.mood,
    count: input.count,
  });
  return result;
}
