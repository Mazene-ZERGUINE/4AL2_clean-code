import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { LeitnerBoxState } from './leitner-box.reducer';

export const selectCards = (state: AppState) => state.cards;

export const selectStatus = createSelector(selectCards, (state: LeitnerBoxState) => state.status);

export const selectAllCards = createSelector(selectCards, (state: LeitnerBoxState) => state.cards);

export const selectDailyCards = createSelector(
  selectCards,
  (state: LeitnerBoxState) => state.cards,
);
