import { Request, Response } from 'express';

import { CardService } from '../../domain/card/CardService';
import { CardResponse } from './response-request/GetAllCards/CardResponse';
import { Card } from '../../domain/card/entities/Card';

export class CardController {
	private readonly _cardService: CardService;

	constructor(cardService: CardService) {
		this._cardService = cardService;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getAll = (req: Request, res: Response): void => {
		const cards = this._cardService.getAll();
		const response = cards.map((card) => this.getCardAsResponse(req, card));

		res.status(200).json(response);
	};

	getCardAsResponse(req: Request, card: Card): CardResponse {
		return new CardResponse(card);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	create = (req: Request, res: Response): void => {
		throw new Error('Method not implemented.');
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getQuizz = (req: Request, res: Response): void => {
		throw new Error('Method not implemented.');
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	answerCard = (req: Request, res: Response): void => {
		throw new Error('Method not implemented.');
	};
}
