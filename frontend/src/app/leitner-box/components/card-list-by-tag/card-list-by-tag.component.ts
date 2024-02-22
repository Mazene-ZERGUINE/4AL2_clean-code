import { Component } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { Observable, combineLatest, map } from 'rxjs';
import { Card } from 'src/app/core/models/card.model';
import { getCardsByTagsMap } from 'src/app/utils/card-adapter/card-adapter.utils';
import { getDistinctValuesFromCardArray } from 'src/app/utils/utils';
import { CardKey } from 'src/app/shared/variables/enum';

@Component({
  selector: 'app-card-list-by-tag',
  templateUrl: './card-list-by-tag.component.html',
  styleUrls: ['./card-list-by-tag.component.scss'],
})
export class CardListByTagComponent {
  constructor(private cardsService: CardsService) {}

  readonly cards$: Observable<Card[]> = this.cardsService.getCards$();

  readonly distinctCardTags$: Observable<string[]> = this.cardsService
    .getCards$()
    .pipe(map((cards) => getDistinctValuesFromCardArray(cards, CardKey.Tag)));

  readonly cardsByTags$: Observable<Map<string, Card[]>> = combineLatest([
    this.cards$,
    this.distinctCardTags$,
  ]).pipe(map(([cards, distinctCardTags]) => getCardsByTagsMap(distinctCardTags, cards)));
}
