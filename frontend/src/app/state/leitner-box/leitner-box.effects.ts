import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { CardsService } from 'src/app/leitner-box/services/cards.service';
import { AppState } from '../app.state';
import { addCard, loadCards, loadCardsSuccess } from './leitner-box.actions';
import { selectAllCards } from './leitner-box.selectors';

@Injectable()
export class LeitnerBoxEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private cardService: CardsService,
  ) {}

  loadCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCards),
      switchMap(() =>
        this.cardService.getCards$().pipe(map((cards) => loadCardsSuccess({ cards }))),
      ),
    ),
  );

  saveCard$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addCard),
        withLatestFrom(this.store.select(selectAllCards)),
        switchMap(([, cards]) => this.cardService.addCard(cards[cards.length - 1])),
      ),
    { dispatch: false },
  );
}
