import { Card } from '../../../domain/card/entities/Card';
import { randomUUID, UUID } from 'crypto';
import { CardRepository } from '../../../domain/card/CardRepository';
import { CardId } from '../../../domain/card/entities/CardId';

export class InMemoryCardRepository implements CardRepository {
	private readonly registry = new Map<UUID, Card>();

	constructor() {
		this.setRegistryDefaultData();
	}

	loadAllCards(): Card[] {
		return [...this.registry.values()];
	}

	loadAllCardsByTags(tags: string[]): Card[] {
		const cards: Card[] = [];

		this.registry.forEach((card) => {
			if (tags.includes(card.tag)) {
				cards.push(card);
			}
		});

		return cards;
	}

	save(card: Card): void {
		if (!this.isQuestionUnique(card.question)) {
			throw new Error();
		}

		this.registry.set(card.cardId.value, card);
	}

	private isQuestionUnique(question: string): boolean {
		for (const existingCard of this.registry.values()) {
			if (existingCard.question === question) {
				return false;
			}
		}

		return true;
	}

	private setRegistryDefaultData(): void {
		const geographyCard1 = new Card(
			new CardId(randomUUID()),
			'What is the capital of France?',
			'Paris',
			'geography',
		);
		const geographyCard2 = new Card(
			new CardId(randomUUID()),
			'What is the capital of Spain?',
			'Madrid',
			'geography',
		);
		const historyCard1 = new Card(
			new CardId(randomUUID()),
			'When did the first world war start?',
			'1914',
			'history',
		);
		const historyCard2 = new Card(
			new CardId(randomUUID()),
			'When did the second world war start?',
			'1939',
			'history',
		);

		this.registry
			.set(geographyCard1.cardId.value, geographyCard1)
			.set(geographyCard2.cardId.value, geographyCard2)
			.set(historyCard1.cardId.value, historyCard1)
			.set(historyCard2.cardId.value, historyCard2);
	}
}
