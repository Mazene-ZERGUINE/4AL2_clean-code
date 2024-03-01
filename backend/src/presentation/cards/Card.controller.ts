import { Request, Response } from 'express';

import { CardService } from '../../domain/card/CardService';
import { CardResponse } from './response-request/CardResponse';
import { Card } from '../../domain/card/entities/Card';
import { CreateCardRequest } from './response-request/CreateCard/CreateCardRequest';
import { CardUserData } from './response-request/CreateCard/CardUserData';

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
			const cardUserData = CardUserData.of(question, answer, tag);
			const createCardRequest = new CreateCardRequest(cardUserData);

			const card = this._cardService.create(createCardRequest);
			const cardResponse = this.getCardAsResponse(card);

			response.status(201).json(cardResponse);
		} catch (_) {
			response.status(400).send('Bad request');
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

		const answeredCard = this._cardService.getCardById(cardId);

		if (answeredCard === undefined) {
			response.status(404).send('Card not found');
		}

		try {
			isValid
				? this._cardService.upgradeCard(answeredCard as Card)
				: this._cardService.downgradeCard(answeredCard as Card);

			response.status(204).send('Answer has been taken into account');
		} catch (e) {
			response.status(400).send('Bad request');
		}
	};
}
