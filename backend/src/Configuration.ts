import { Express, Request, Response } from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import { CardRepository } from './domain/card/CardRepository';
import cardsRouter from './presentation/cards/cards.router'; // Adjust the import path accordingly

export class ConfigurationBuilder {
	private app?: Express;
	private cardRepository?: CardRepository;

	withApp(app: Express): ConfigurationBuilder {
		this.app = app;
		return this;
	}

	withCardRepository(repository: CardRepository): ConfigurationBuilder {
		this.cardRepository = repository;
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

		this.app
			.use('/ping', (req: Request, res: Response) => res.json('ping'))
			.use('/cards', cardsRouter.router);

		return this;
	}

	build(): Express {
		if (!this.app) {
			throw new Error('Express app is not configured.');
		}

		return this.app;
	}
}
