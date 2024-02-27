import express from 'express';
import { InMemoryCardRepository } from './infrastructure/in-memory/cards/InMemoryCardRepository';
import { ConfigurationBuilder } from './Configuration';
import { CardService } from './domain/card/CardService';
import { CardRepository } from './domain/card/CardRepository';
import { CardController } from './presentation/cards/Card.controller';
import { CardRouter } from './presentation/cards/card.router';
import dotenv from 'dotenv';

dotenv.config();

const HOST = process.env.HOST || 'localhost';
const PORT: number = Number(process.env.SERVER_PORT) || 8080;

const cardRepository: CardRepository = new InMemoryCardRepository();
const cardService = new CardService(cardRepository);
const cardController = new CardController(cardService);
const cardRouter = new CardRouter(cardController);

const app = new ConfigurationBuilder()
	.withApp(express())
	.withCardController(cardController)
	.withCardRepository(cardRepository)
	.withCardRouter(cardRouter)
	.useMiddlewares()
	.useRoutes()
	.build();

app.listen(PORT, () => {
	// eslint-disable-next-line no-console
	console.log(`🚀 Server is running at http://${HOST}:${PORT}`);
});
