import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Card } from 'src/app/core/models/card.model';
import { CardsService } from '../services/cards.service';

//pour l'instant le dossier resolvers ne sert à rien. On peut laisser pour l'instant c'est pas très grave.
export const cardsResolver: ResolveFn<Card[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  cardService: CardsService = inject(CardsService),
): Observable<Card[]> => {
  return cardService.getCards$();
};
