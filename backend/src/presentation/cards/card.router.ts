import { Router } from 'express';
import { CardController } from './Card.controller';
import { RouterConfiguration } from '../RouterConfiguration';

export class CardRouter implements RouterConfiguration {
	private readonly _router = Router();
	private readonly _cardController: CardController;

	constructor(cardController: CardController) {
		this._cardController = cardController;

		this.initRoutes();
	}

	get router(): Router {
		return this._router;
	}

	initRoutes(): void {
		this.router
			.get('/', this._cardController.getAll)
			.post('/', this._cardController.create)
			.patch('/:cardId/answer', this._cardController.answerCard)
			.get('/quizz', this._cardController.getQuiz);
	}
}
