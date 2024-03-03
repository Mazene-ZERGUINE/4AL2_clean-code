import { randomUUID } from 'crypto';
import { differenceInDays } from 'date-fns';

import { CardRepository } from '../../../domain/card/CardRepository';
import { Card } from '../../../domain/card/entities/Card';
import { CreateCardRequest } from '../../../presentation/cards/response-request/CreateCard/CreateCardRequest';
import { CardId } from '../../../domain/card/entities/CardId';
import { CardService } from '../../../domain/card/CardService';
import { Category } from '../../../domain/card/entities/Category';

export class CardServiceImpl implements CardService {
	private readonly _cardRepository: CardRepository;

	constructor(cardRepository: CardRepository) {
		this._cardRepository = cardRepository;
	}

	async create({ question, tag, answer }: CreateCardRequest): Promise<Card> {
		if (await this._cardRepository.questionExists(question)) {
			throw new Error('Question needs to be unique');
		}

		const card = new Card(new CardId(randomUUID()), question, answer, tag, Category.FIRST);
		await this._cardRepository.save(card);

		return card;
	}

	async getAll(): Promise<Card[]> {
		return await this._cardRepository.loadAllCards();
	}

	async getAllByTags(tags: string[]): Promise<Card[]> {
		return await this._cardRepository.loadAllCardsByTags(tags);
	}

	async getAllByDate(date: Date): Promise<Card[]> {
		const allCards = await this._cardRepository.loadAllCards();

		const arbitraryLearningStartDate = new Date('2024-02-25');
		const frequency = differenceInDays(date, arbitraryLearningStartDate);

		const todayCards: Card[] = [];

		const categoryOrder = {
			[Category.FIRST]: 1,
			[Category.SECOND]: 2,
			[Category.THIRD]: 4,
			[Category.FORTH]: 8,
			[Category.FIFTH]: 16,
			[Category.SIXTH]: 32,
			[Category.SEVENTH]: 64,
		};

		allCards.forEach((card: Card) => {
			const order = categoryOrder[card.category as keyof typeof categoryOrder];

			if (this.isTodayQuizCard(order, frequency)) {
				todayCards.push(card);
			}
		});

		return todayCards;
	}

	private isTodayQuizCard(order: number, frequency: number): boolean {
		return order !== undefined && frequency % order === 0;
	}

	async getById(cardId: string): Promise<Card | undefined> {
		return await this._cardRepository.loadCardById(cardId);
	}

	async upgradeCard(card: Card): Promise<void> {
		const upgradedCard = new Card(
			new CardId(card.cardId.value),
			card.question,
			card.answer,
			card.tag,
			card.category,
		);

		const categories = Object.values(Category);
		const currentIndex = categories.indexOf(card.category);

		if (this.isLatestCategory(currentIndex, categories.length)) {
			throw new Error('Card is already in the highest category');
		}

		upgradedCard.category = categories[currentIndex + 1];
		await this._cardRepository.save(upgradedCard);
	}

	private isLatestCategory(currentIndex: number, categoriesLength: number): boolean {
		return currentIndex >= categoriesLength - 1;
	}

	async downgradeCard(card: Card): Promise<void> {
		const downgradedCard = new Card(
			new CardId(card.cardId.value),
			card.question,
			card.answer,
			card.tag,
			Category.FIRST,
		);

		await this._cardRepository.save(downgradedCard);
	}
}
