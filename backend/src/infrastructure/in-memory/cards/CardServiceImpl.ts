import { CardRepository } from '../../../domain/card/CardRepository';
import { Card } from '../../../domain/card/entities/Card';
import { CreateCardRequest } from '../../../presentation/cards/response-request/CreateCard/CreateCardRequest';
import { CardId } from '../../../domain/card/entities/CardId';
import { randomUUID } from 'crypto';
import { CardService } from '../../../domain/card/CardService';
import {Category} from "../../../domain/card/entities/Category";
import {differenceInDays} from "date-fns";

export class CardServiceImpl implements CardService {
	private readonly _cardRepository: CardRepository;

	constructor(cardRepository: CardRepository) {
		this._cardRepository = cardRepository;
	}

	getAll(): Card[] {
		return this._cardRepository.loadAllCards();
	}

	getAllByTags(tags: string[]): Card[] {
		return this._cardRepository.loadAllCardsByTags(tags);
	}

	create({ question, tag, answer }: CreateCardRequest): Card {
		const card = new Card(new CardId(randomUUID()), question, answer, tag);
		this._cardRepository.save(card);

		return card;
	}

	getCardsByDate(date: Date): Card[] {
		const allCards = this._cardRepository.loadAllCards();

		// date de demo pour le calcule des fréquance des cards
		const learningStartDate: Date = new Date('2024-02-12');
		const frequency = differenceInDays(date, learningStartDate);

		const todayCards: Card[] = [];

		const categoryOrder = {
			[Category.FIRST]: 1,
			[Category.SECOND]: 2,
			[Category.THIRD]: 3,
			[Category.FORTH]: 4,
			[Category.FIFTH]: 5,
			[Category.SIXTH]: 6,
			[Category.SEVENTH]: 7,
		};

		allCards.forEach((card: Card) => {
			const order = categoryOrder[card.category as keyof typeof categoryOrder];
			if (order !== undefined && frequency % Math.pow(2, order) === 0) {
				todayCards.push(card);
			}
		});

		return todayCards;
	}
}
