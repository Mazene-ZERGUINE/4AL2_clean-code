import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import { InMemoryCardRepository } from './infrastructure/in-memory/cards/InMemoryCardRepository';
import { ConfigurationBuilder } from './Configuration';

const HOST = process.env.HOST || 'localhost';
const PORT: number = Number(process.env.SERVER_PORT) || 8080;
export const cardRepository = new InMemoryCardRepository();

const app = new ConfigurationBuilder()
	.withApp(express())
	.withCardRepository(cardRepository)
	.useMiddlewares()
	.useRoutes()
	.build();

app.listen(PORT, () => {
	// eslint-disable-next-line no-console
	console.log(`🚀 Server is running at http://${HOST}:${PORT}`);
});
