import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import { CardsService } from 'src/app/leitner-box/services/cards.service';
import { AppState } from '../app.state';
import {
  addCard,
  answerCard,
  loadCards,
  loadCardsSuccess,
  loadDailyCards,
} from './leitner-box.actions';

@Injectable()
export class LeitnerBoxEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private cardService: CardsService,
  ) {}

  loadDailyCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDailyCards),
      switchMap(() =>
        this.cardService.getDailyCards$().pipe(map((cards) => loadCardsSuccess({ cards }))),
      ),
    ),
  );

  loadCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCards),
      switchMap(() =>
        this.cardService.getCards$().pipe(map((cards) => loadCardsSuccess({ cards }))),
      ),
    ),
  );

  addCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCard),
      switchMap((action) =>
        this.cardService.addCard(action.newCard).pipe(map(() => loadDailyCards())),
      ),
    ),
  );

  answerCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(answerCard),
      switchMap((action) =>
        this.cardService
          .answerCard(action.cardId, action.isValid)
          .pipe(map(() => loadDailyCards())),
      ),
    ),
  );
}
