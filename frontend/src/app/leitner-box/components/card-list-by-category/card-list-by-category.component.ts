import { Component } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { Card } from 'src/app/core/models/card.model';
import { CardKey } from 'src/app/shared/variables/enum';
import { getCardsByCategoriesMap } from 'src/app/utils/card-adapter/card-adapter.utils';
import { getDistinctValuesFromCardArray } from 'src/app/utils/utils';
import { CardsService } from '../../services/cards.service';

@Component({
  selector: 'app-card-list-by-category',
  templateUrl: './card-list-by-category.component.html',
  styleUrls: ['./card-list-by-category.component.scss'],
})
export class CardListByCategoryComponent {
  constructor(private cardsService: CardsService) {}

  readonly cards$: Observable<Card[]> = this.cardsService.getCards$();

  readonly distinctCardCategories$: Observable<string[]> = this.cardsService
    .getCards$()
    .pipe(map((cards) => getDistinctValuesFromCardArray(cards, CardKey.Category)));

  readonly cardsByCategories$: Observable<Map<string, Card[]>> = combineLatest([
    this.cards$,
    this.distinctCardCategories$,
  ]).pipe(
    map(([cards, distinctCardCategories]) =>
      getCardsByCategoriesMap(distinctCardCategories, cards),
    ),
  );
}
