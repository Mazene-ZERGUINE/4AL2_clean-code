import { randomUUID, UUID } from 'crypto';

import { Card } from '../../../domain/card/entities/Card';
import { CardRepository } from '../../../domain/card/CardRepository';
import { CardId } from '../../../domain/card/entities/CardId';
import { Category } from '../../../domain/card/entities/Category';

export class InMemoryCardRepository implements CardRepository {
	private readonly registry = new Map<UUID, Card>();

	constructor() {
		this.setRegistryDefaultData();
	}

	cardWithSameQuestionAndTagExist(card: Card): Promise<boolean> {
		for (const existingCard of this.registry.values()) {
			if (existingCard.question === card.question && existingCard.tag === card.tag) {
				return Promise.resolve(true);
			}
		}

		return Promise.resolve(false);
	}

	loadCardById(id: string): Promise<undefined | Card> {
		return Promise.resolve(this.registry.get(id as UUID));
	}

	loadAllCards(): Promise<Card[]> {
		return Promise.resolve([...this.registry.values()]);
	}

	loadAllCardsByTags(tags: string[]): Promise<Card[]> {
		const cards: Card[] = [];

		this.registry.forEach((card) => {
			if (tags.includes(card.tag)) {
				cards.push(card);
			}
		});

		return Promise.resolve(cards);
	}

	save(card: Card): Promise<void> {
		if (this.registry.get(card.cardId.value)) {
			return Promise.resolve();
		}

		this.registry.set(card.cardId.value, card);
		return Promise.resolve();
	}

	update(card: Card): Promise<void> {
		if (!this.registry.get(card.cardId.value)) {
			return Promise.resolve();
		}

		this.registry.set(card.cardId.value, card);
		return Promise.resolve();
	}

	private setRegistryDefaultData(): void {
		const geographyCard1 = new Card(
			new CardId(randomUUID()),
			'What is the capital of France?',
			'Paris',
			'geography',
			Category.FIRST,
		);
		const geographyCard2 = new Card(
			new CardId(randomUUID()),
			'What is the capital of Spain?',
			'Madrid',
			'geography',
			Category.FIRST,
		);
		const historyCard1 = new Card(
			new CardId(randomUUID()),
			'When did the first world war start?',
			'1914',
			'history',
			Category.FIFTH,
		);
		const historyCard2 = new Card(
			new CardId(randomUUID()),
			'When did the second world war start?',
			'1939',
			'history',
			Category.SECOND,
		);
		const historyCard3 = new Card(
			new CardId(randomUUID()),
			'Who is adolf hitler',
			'the one who started world war 2',
			'history',
			Category.FORTH,
		);

		const programmingCard1 = new Card(
			new CardId(randomUUID()),
			'Who invented linux',
			'Linus Torvalds',
			'programming',
			Category.SECOND,
		);

		const programmingCard2 = new Card(
			new CardId(randomUUID()),
			'Who is the best c programmer',
			'of cours it is Sananes',
			'programming',
			Category.THIRD,
		);

		this.registry
			.set(geographyCard1.cardId.value, geographyCard1)
			.set(geographyCard2.cardId.value, geographyCard2)
			.set(historyCard1.cardId.value, historyCard1)
			.set(historyCard2.cardId.value, historyCard2)
			.set(historyCard3.cardId.value, historyCard3)
			.set(programmingCard1.cardId.value, programmingCard1)
			.set(programmingCard2.cardId.value, programmingCard2);
	}
}
