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

	getQuiz = (request: Request, response: Response): void => {
		const date: string = (request.query.date as string) || new Date().toISOString();
		const quizDate: Date = new Date(date);

		const cards: Card[] = this._cardService.getCardsByDate(quizDate);
		const cardResponses = cards.map((card: Card) => this.getCardAsResponse(card));

		response.status(200).json(cardResponses);
	};

	answerCard = (request: Request, response: Response): void => {
		const { cardId } = request.params;
		const { isValid } = request.body;

		const answerdCard = this._cardService.getCardById(cardId);

		if (answerdCard === undefined) {
			response.status(404).json('card not found');
		}

		isValid
			? this._cardService.upgradeCard(answerdCard as Card)
			: this._cardService.downgradeCard(answerdCard as Card);

		response.send('ok');
	};
}
