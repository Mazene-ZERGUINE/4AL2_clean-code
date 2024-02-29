import { Request, Response } from 'express';

import { CardService } from '../../domain/card/CardService';
import { CardResponse } from './response-request/CardResponse';
import { Card } from '../../domain/card/entities/Card';
import { CreateCardRequest } from './response-request/CreateCard/CreateCardRequest';
import { CreateCardRequestArguments } from './response-request/CreateCard/CreateCardRequestArguments';

export class CardController {
	private readonly _cardService: CardService;

	constructor(cardService: CardService) {
		this._cardService = cardService;
	}

	getAll = (request: Request, response: Response): void => {
		const tags: string[] = request.query.tags ? (request.query.tags as string).split(',') : [];
		const cards =
			tags.length == 0 ? this._cardService.getAll() : this._cardService.getAllByTags(tags);
		const cardResponses: CardResponse[] = cards.map((card) => this.getCardAsResponse(card));

		response.status(200).json(cardResponses);
	};

	private getCardAsResponse(card: Card): CardResponse {
		return new CardResponse(card);
	}

	create = (request: Request, response: Response): void => {
		const { question, answer, tag } = request.body;

		try {
			const createCardRequestParameters = CreateCardRequestArguments.of(question, tag, answer);
			const createCardRequest = new CreateCardRequest(createCardRequestParameters);

			const card = this._cardService.create(createCardRequest);
			const cardResponse = this.getCardAsResponse(card);

			response.status(201).json(cardResponse);
		} catch (_) {
			response.status(400).end();
		}
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getQuizz = (req: Request, res: Response): void => {
		const date: string = (req.query.date as string) || new Date().toISOString();
		const quizzDate: Date = new Date(date);

		const cards: Card[] = this._cardService.getCardsByDate(quizzDate);
		const response = cards.map((card: Card) => this.getCardAsResponse(card));

		res.status(200).json(response);
	};

	answerCard = (): void => {};
}
