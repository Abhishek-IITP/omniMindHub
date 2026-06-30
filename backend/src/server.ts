import "dotenv/config";
import express, { Request, Response } from 'express';
import cors from "cors";
import recommendedRouter from "./routes/recommended.routes.js"

const app = express();

app.use(cors())
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/health', (_req: Request, res: Response) => {
    res.json({status:"ok"});
});
app.use("/api/recommend",recommendedRouter)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});