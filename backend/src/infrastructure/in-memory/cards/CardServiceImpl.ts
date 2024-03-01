import { CardRepository } from '../../../domain/card/CardRepository';
import { Card } from '../../../domain/card/entities/Card';
import { CreateCardRequest } from '../../../presentation/cards/response-request/CreateCard/CreateCardRequest';
import { CardId } from '../../../domain/card/entities/CardId';
import { randomUUID } from 'crypto';
import { CardService } from '../../../domain/card/CardService';
import { Category } from '../../../domain/card/entities/Category';
import { differenceInDays } from 'date-fns';

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
		const card = new Card(new CardId(randomUUID()), question, answer, tag, Category.FIRST);

		this._cardRepository.save(card);

		return card;
	}

	getCardsByDate(date: Date): Card[] {
		const allCards = this._cardRepository.loadAllCards();

		const learningStartDate: Date = new Date('2024-02-25');
		const frequency = differenceInDays(date, learningStartDate);

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
			if (this.isTodayQuizzCard(order, frequency)) {
				todayCards.push(card);
			}
		});

		return todayCards;
	}

	private isTodayQuizzCard(order: number, frequency: number): boolean {
		return order !== undefined && frequency % order === 0;
	}

	getCardById(cardId: string): Card | undefined {
		const cards = this._cardRepository.loadAllCards();
		return cards.find((card: Card) => card.cardId.value == cardId);
	}

	upgradeCard(card: Card) {
		const categories = Object.values(Category);
		const currentIndex = categories.indexOf(card.category);
		if (currentIndex < categories.length - 1) {
			card.category = categories[currentIndex + 1];
		} else {
			card.category = Category.DONE;
		}
		this._cardRepository.save(card);
	}

	downgradeCard(card: Card) {
		card.category = Category.FIRST;
		this._cardRepository.save(card);
	}
}
