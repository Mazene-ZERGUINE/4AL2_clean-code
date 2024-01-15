import express, {Request, Response} from 'express';
import {Express} from 'express';



import dotenv from 'dotenv';
dotenv.config();

const port: number = Number(process.env.SERVER_PORT) || 3000;
const app: Express = express();

app.get("/", (req: Request, res: Response) => {
	res.json("ping");
});

app.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(`🚀 Server is running on port ${port}`);
});
