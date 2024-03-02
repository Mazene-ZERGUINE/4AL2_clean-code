import { Express, Request, Response } from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';

import { CardRepository } from './domain/card/CardRepository';
import { CardController } from './presentation/cards/Card.controller';
import { RouterConfiguration } from './presentation/RouterConfiguration';

export class AppConfigurationBuilder {
	private app?: Express;
	private cardRepository?: CardRepository;
	private cardController?: CardController;
	private cardRouter?: RouterConfiguration;

	withApp(app: Express): AppConfigurationBuilder {
		this.app = app;
		return this;
	}

	withCardController(controller: CardController): AppConfigurationBuilder {
		this.cardController = controller;
		return this;
	}

	withCardRepository(repository: CardRepository): AppConfigurationBuilder {
		this.cardRepository = repository;
		return this;
	}

	withCardRouter(router: RouterConfiguration): AppConfigurationBuilder {
		this.cardRouter = router;
		return this;
	}

	useMiddlewares(): AppConfigurationBuilder {
		if (!this.app) {
			throw new Error('Express app is not set.');
		}

		this.app
			.use(cors())
			.use(json())
			.use(urlencoded({ extended: true }));

		return this;
	}

	useRoutes(): AppConfigurationBuilder {
		if (!this.app) {
			throw new Error('Express app is not set.');
		}
		if (!this.cardRouter) {
			throw new Error('Card router is not set.');
		}

		this.app
			.use('/ping', (req: Request, res: Response) => res.json('ping'))
			.use('/cards', this.cardRouter.router);

		return this;
	}

	build(): Express {
		if (!this.app) {
			throw new Error('Express app is not configured.');
		}

		return this.app;
	}
}
