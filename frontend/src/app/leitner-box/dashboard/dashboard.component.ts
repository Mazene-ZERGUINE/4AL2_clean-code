import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';
import { CardCategory } from 'src/app/core/models/types/category.enum';
import { CardKey } from 'src/app/shared/variables/enum';
import { AppState } from 'src/app/state/app.state';
import { loadCards } from 'src/app/state/leitner-box/leitner-box.actions';
import { selectAllCards } from 'src/app/state/leitner-box/leitner-box.selectors';
import { getCardsByTagsMap } from 'src/app/utils/card-adapter/card-adapter.utils';
import { getDistinctValuesFromCardArray } from 'src/app/utils/utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private state: Store<AppState>) {}

  readonly allCards$ = this.state.select(selectAllCards);
  readonly onlyFirstCategoryCard$ = this.allCards$.pipe(
    map((cards) => cards.filter((card) => card.category === CardCategory.FIRST)),
  );
  readonly distinctCardsTag$ = this.allCards$.pipe(
    map((cards) => getDistinctValuesFromCardArray(cards, CardKey.Tag)),
  );
  readonly cardsByTag$ = combineLatest([this.distinctCardsTag$, this.onlyFirstCategoryCard$]).pipe(
    map(([distinctCardsTag, onlyFirstCategoryCards]) =>
      getCardsByTagsMap(distinctCardsTag, onlyFirstCategoryCards),
    ),
  );

  ngOnInit(): void {
    this.state.dispatch(loadCards());
  }
}
