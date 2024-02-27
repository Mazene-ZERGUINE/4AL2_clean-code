import { Router } from 'express';
import { CardController } from './Card.controller';

class CardsRouter {
	private readonly _router = Router();

	constructor() {
		this.initRoutes();
	}

	get router(): Router {
		return this._router;
	}

	initRoutes(): void {
		this.router
			.get('/', CardController.getAll)
			.post('/', CardController.create)
			.patch('/:cardId/answer', CardController.answerCard)
			.get('/quizz', CardController.getQuizz);
	}
}

export default new CardsRouter();
