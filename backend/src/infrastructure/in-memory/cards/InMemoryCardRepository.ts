import { CreateCardRequest } from '../../../presentation/cards/response-request/CreateCard/CreateCardRequest';
import { Card } from '../../../domain/card/entities/Card';
import { randomUUID, UUID } from 'crypto';
import { CardRepository } from '../../../domain/card/CardRepository';

export class InMemoryCardRepository implements CardRepository {
	private readonly registry = new Map<UUID, Card>();

	constructor() {
		this.setRegistryDefaultData();
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	createCard(card: CreateCardRequest): Card {
		throw new Error('Method not implemented.');
		// this.registry.set(card.id, card);
	}

	loadAllCards(): Card[] {
		return [...this.registry.values()];
	}

	private setRegistryDefaultData(): void {
		const geographyCard1 = new Card(
			randomUUID(),
			'What is the capital of France?',
			'Paris',
			'geography',
		);
		const geographyCard2 = new Card(
			randomUUID(),
			'What is the capital of Spain?',
			'Madrid',
			'geography',
		);
		const historyCard1 = new Card(
			randomUUID(),
			'When did the first world war start?',
			'1914',
			'history',
		);
		const historyCard2 = new Card(
			randomUUID(),
			'When did the second world war start?',
			'1939',
			'history',
		);

		this.registry
			.set(geographyCard1.id, geographyCard1)
			.set(geographyCard2.id, geographyCard2)
			.set(historyCard1.id, historyCard1)
			.set(historyCard2.id, historyCard2);
	}
}
