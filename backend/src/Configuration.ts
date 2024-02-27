import { Express, json, Request, Response, urlencoded } from 'express';
import cors from 'cors';
import cardsRouter from './adapter/in/router/cards.router';

export abstract class Configuration {
	private static app?: Express;

	static setApp(app: Express): void {
		this.app = app;

		this.useMiddlewares();
		this.useRoutes();
	}

	private static useMiddlewares(): void {
		this.app
			?.use(cors())
			.use(json())
			.use(urlencoded({ extended: true }));
	}

	private static useRoutes(): void {
		this.app
			?.use('/ping', (req: Request, res: Response) => {
				res.json('ping');
			})
			.use('/cards', cardsRouter.router);
	}
}
