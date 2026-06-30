import "dotenv/config";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { BookRecommendationsSchema } from "../models/book.schema.js";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: process.env.GEMINI_API_KEY!,
  temperature: 0.3,
});

const promptTemplate = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are a book recommendation expert and literary critic.
Return high-quality recommendations based on:
- user's request
- genre
- mood
- count

Every book should feel intentional.
Do not recommend only the most obvious titles every time.`,
  ],
  [
    "human",
    `User request: {userPrompt}

Preferences:
- Genre: {genre}
- Mood: {mood}
- Number of books: {count}`,
  ],
]);

const structureModel = model.withStructuredOutput(BookRecommendationsSchema);

export async function getBookRecommendations(input: {
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
