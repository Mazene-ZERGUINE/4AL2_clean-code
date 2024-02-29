import { Express, Request, Response } from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';

import { CardRepository } from './domain/card/CardRepository';
import { CardController } from './presentation/cards/Card.controller';
import { IRouter } from './presentation/Router';

export class ConfigurationBuilder {
	private app?: Express;
	private cardRepository?: CardRepository;
	private cardController?: CardController;
	private cardRouter?: IRouter;

	withApp(app: Express): ConfigurationBuilder {
		this.app = app;
		return this;
	}

	withCardController(controller: CardController): ConfigurationBuilder {
		this.cardController = controller;
		return this;
	}

	withCardRepository(repository: CardRepository): ConfigurationBuilder {
		this.cardRepository = repository;
		return this;
	}

	withCardRouter(router: IRouter): ConfigurationBuilder {
		this.cardRouter = router;
		return this;
	}

	useMiddlewares(): ConfigurationBuilder {
		if (!this.app) {
			throw new Error('Express app is not set.');
		}

		this.app
			.use(cors())
			.use(json())
			.use(urlencoded({ extended: true }));

		return this;
	}

	useRoutes(): ConfigurationBuilder {
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
