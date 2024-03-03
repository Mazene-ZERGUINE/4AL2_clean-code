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

	getAll = async (request: Request, response: Response): Promise<void> => {
		const tags: string[] = request.query.tags ? (request.query.tags as string).split(',') : [];

		try {
			const cards =
				tags.length == 0
					? await this._cardService.getAll()
					: await this._cardService.getAllByTags(tags);

			const cardResponses: CardResponse[] = cards.map((card) => this.mapAsCardResponse(card));
			response.status(200).json(cardResponses);
		} catch (_) {
			response.status(500).end();
		}
	};

	private mapAsCardResponse(card: Card): CardResponse {
		return new CardResponse(card);
	}

	create = async (request: Request, response: Response): Promise<void> => {
		const { question, answer, tag } = request.body;

		try {
			const createCardRequest = new CreateCardRequest(CardUserData.of(question, answer, tag));
			const card = await this._cardService.create(createCardRequest);

			response.status(201).json(this.mapAsCardResponse(card));
		} catch (_) {
			response.status(400).send('Bad request');
		}
	};

	getQuiz = async (request: Request, response: Response): Promise<void> => {
		const providedDateOrTodaysDate: string =
			(request.query.date as string) || new Date().toISOString();
		const quizDate = new Date(providedDateOrTodaysDate);

		try {
			const cards = await this._cardService.getAllByDate(quizDate);

			const cardResponses: CardResponse[] = cards.map((card) => this.mapAsCardResponse(card));
			response.status(200).json(cardResponses);
		} catch (_) {
			response.status(500).end();
		}
	};

	answerCard = async (request: Request, response: Response): Promise<void> => {
		try {
			const answeredCard = await this._cardService.getById(request.params.cardId);
			if (!answeredCard) {
				response.status(404).send('Card not found');
				return;
			}

			request.body.isValid
				? await this._cardService.upgradeCard(answeredCard)
				: await this._cardService.downgradeCard(answeredCard);

			response.status(204).send('Answer has been taken into account');
		} catch (_) {
			response.status(400).send('Bad request');
		}
	};
}
