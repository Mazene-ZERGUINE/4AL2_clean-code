import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Card } from 'src/app/core/models/card.model';
import { CardCategory } from 'src/app/core/models/types/category.enum';

@Injectable()
export class CardsService {
  getCards$(): Observable<Card[]> {
    return of([
      {
        id: '6c10ad48-2bb8-4e2e-900a-21d62c00c07b',
        category: CardCategory.FIRST,
        question: 'What is pair programming ?',
        answer: 'A practice to work in pair on same computer.',
        tag: 'Teamwork',
      },
      {
        id: '6c10ad48-2bb8-4e2e-900a-21d62c00c07b',
        category: CardCategory.SECOND,
        question: 'What is the most important',
        answer: 'A practice to work in pair on same computer.',
        tag: 'Teamwork',
      },
      {
        id: '6c10ad48-2bb8-4e2e-900a-21d62c00c07b',
        category: CardCategory.THIRD,
        question: 'enfant',
        answer: 'tifl',
        tag: 'Arabe',
      },
      {
        id: '6c10ad48-2bb8-4e2e-900a-21d62c00c07b',
        category: CardCategory.THIRD,
        question: 'kaka',
        answer: 'bouzar',
        tag: 'Arabe',
      },
    ]);
  }
}
