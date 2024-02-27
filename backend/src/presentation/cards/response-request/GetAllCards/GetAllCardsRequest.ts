export class GetAllCardsRequest {
	private readonly _tags: string[];

	constructor(tags: string[] = []) {
		this._tags = tags;
	}

	get tags(): string[] {
		return this._tags;
	}
}
