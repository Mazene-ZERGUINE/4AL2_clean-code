import { CreateCardRequest } from '../../../presentation/cards/response-request/CreateCard/CreateCardRequest';
import { Card } from '../../../domain/card/entities/Card';
import { randomUUID, UUID } from 'crypto';
import { CardRepository } from '../../../domain/card/CardRepository';
import { CardId } from '../../../domain/card/entities/CardId';

export class InMemoryCardRepository implements CardRepository {
	private readonly registry = new Map<UUID, Card>();

	constructor() {
		this.setRegistryDefaultData();
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	save(request: CreateCardRequest): Card {
		throw new Error('Method not implemented.');
	}

	loadAllCards(): Card[] {
		return [...this.registry.values()];
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
			.set(geographyCard1.cardId.id, geographyCard1)
			.set(geographyCard2.cardId.id, geographyCard2)
			.set(historyCard1.cardId.id, historyCard1)
			.set(historyCard2.cardId.id, historyCard2);
	}
}
