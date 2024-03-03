/* eslint-disable no-console */
import express from 'express';
import dotenv from 'dotenv';

import { InMemoryCardRepository } from './infrastructure/in-memory/cards/InMemoryCardRepository';
import { AppConfigurationBuilder } from './AppConfigurationBuilder';
import { CardService } from './domain/card/CardService';
import { CardRepository } from './domain/card/CardRepository';
import { CardController } from './presentation/cards/Card.controller';
import { CardRouter } from './presentation/cards/card.router';
import { CardServiceImpl } from './infrastructure/in-memory/cards/CardServiceImpl';
import { RouterConfiguration } from './presentation/RouterConfiguration';

dotenv.config();

const HOST = process.env.HOST || 'localhost';
const PORT: number = Number(process.env.SERVER_PORT) || 8080;

const cardRepository: CardRepository = new InMemoryCardRepository();
const cardService: CardService = new CardServiceImpl(cardRepository);
const cardController = new CardController(cardService);
const cardRouter: RouterConfiguration = new CardRouter(cardController);

try {
	const app = new AppConfigurationBuilder()
		.withApp(express())
		.withCardController(cardController)
		.withCardRepository(cardRepository)
		.withCardRouter(cardRouter)
		.useMiddlewares()
		.useRoutes()
		.build();

	app.listen(PORT, () => {
		console.log(`🚀 Server is running at http://${HOST}:${PORT}`);
	});
} catch (e) {
	console.error(e);
}
