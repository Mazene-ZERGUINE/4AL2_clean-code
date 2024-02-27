import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import { Configuration } from './Configuration';

const app = express();
const HOST = process.env.HOST || 'localhost';
const PORT: number = Number(process.env.SERVER_PORT) || 8080;

Configuration.setApp(app);

app.listen(PORT, () => {
	// eslint-disable-next-line no-console
	console.log(`🚀 Server is running at http://${HOST}:${PORT}`);
});
